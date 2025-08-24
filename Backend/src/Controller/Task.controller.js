import ApiError from "../Utility/ApiError.js";
import ApiResponse from "../Utility/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteOnCloudinary,
} from "../Utility/cloudinary.js";
import { prisma } from "../DB/DataBase.js";

const CreateTask = async (req, res) => {
  const { title, description, latitude, longitude } = req.body;
  const imageUrlLocalPath = req.file?.path;

  if (!req.user) {
    throw new ApiError(401, "Unauthorized access");
  }

  if (!title || !description || !latitude || !longitude) {
    throw new ApiError(
      400,
      "Title, description, latitude, and longitude are required"
    );
  }

  try {
    const imageUrl = imageUrlLocalPath
      ? await uploadOnCloudinary(imageUrlLocalPath)
      : null;
    if (imageUrlLocalPath && !imageUrl) {
      throw new ApiError(500, "Failed to upload image to cloudinary");
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        imageUrl: imageUrl?.url,
        creatorId: req.user.id,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, task, "Task created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to create task");
  }
};

const GetAllTasks = async (req, res) => {
  const { status, limit = 10, page = 1 } = req.query;
  const skip = (parseInt(page) - 1) * parseInt(limit);

  const filter = {};
  if (status) {
    filter.status = status;
  }

  try {
    const tasks = await prisma.task.findMany({
      where: filter,
      skip,
      take: parseInt(limit),
      include: {
        creator: {
          select: { name: true },
        },
        _count: {
          select: {
            votes: {
              where: {
                value: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const tasksWithVoteCounts = await Promise.all(
      tasks.map(async (task) => {
        const trueVotes = await prisma.vote.count({
          where: {
            taskId: task.id,
            value: true,
          },
        });
        const falseVotes = await prisma.vote.count({
          where: {
            taskId: task.id,
            value: false,
          },
        });

        // Create a clean object to send in the response
        return {
          ...task,
          trueVotes,
          falseVotes,
          _count: undefined, // Remove the raw count to avoid confusion
        };
      })
    );

    return res
      .status(200)
      .json(
        new ApiResponse(200, tasksWithVoteCounts, "Tasks fetched successfully")
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to fetch tasks");
  }
};

const GetTasksbyUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        tasksCreated: true,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          user.tasksCreated,
          "User tasks fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to fetch user tasks");
  }
};

const VoteonTask = async (req, res) => {
  const { taskId } = req.params;
  const { value } = req.body;

  if (!req.user) {
    throw new ApiError(401, "Unauthorized access");
  }

  if (typeof value !== "boolean") {
    throw new ApiError(400, "Vote value must be a boolean (true/false)");
  }

  try {
    const existingVote = await prisma.vote.findFirst({
      where: {
        taskId,
        voterId: req.user.id,
      },
    });

    if (existingVote) {
      throw new ApiError(409, "User has already voted on this task");
    }

    const vote = await prisma.vote.create({
      data: {
        taskId,
        voterId: req.user.id,
        value,
      },
    });

    // Call the new handler after the vote is created
    await processTaskVotes(taskId);

    await processVoteForStatusUpdate(taskId);

    return res
      .status(201)
      .json(new ApiResponse(201, vote, "Vote cast successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to vote on task");
  }
};
//  handler to check and delete task  based on votes
const processTaskVotes = async (taskId) => {
  try {
    const falseVotesCount = await prisma.vote.count({
      where: {
        taskId: taskId,
        value: false,
      },
    });

    const trueVotesCount = await prisma.vote.count({
      where: {
        taskId: taskId,
        value: true,
      },
    });

    if (falseVotesCount >= 5 && falseVotesCount > trueVotesCount) {
      // Logic to delete the task and its related data
      const taskToDelete = await prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!taskToDelete) {
        // Task was already deleted, no action needed
        return;
      }

      // Delete associated comments and votes
      await prisma.comment.deleteMany({
        where: { taskId: taskId },
      });

      await prisma.vote.deleteMany({
        where: { taskId: taskId },
      });

      // Delete the task from the database
      await prisma.task.delete({
        where: { id: taskId },
      });

      // Delete image from Cloudinary if it exists
      if (taskToDelete.imageUrl) {
        await deleteOnCloudinary(taskToDelete.imageUrl);
      }

      console.log(
        `Task ${taskId} was automatically deleted due to negative votes.`
      );
      return true; // Return a success flag
    }

    // Return false or nothing if the deletion condition is not met
    return false;
  } catch (error) {
    console.error("Error processing task votes:", error);
    return false;
  }
};
// New handler to check and update task status based on votes
const processVoteForStatusUpdate = async (taskId) => {
  try {
    // Count all 'true' votes for the given task
    const trueVotesCount = await prisma.vote.count({
      where: {
        taskId: taskId,
        value: true, // Only count votes with a value of 'true'
      },
    });

    // Check if the condition for changing status is met
    if (trueVotesCount >= 3) {
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          status: "OPEN",
        },
      });
      console.log(`Task ${taskId} status updated to OPEN due to 3 true votes.`);
    }
  } catch (error) {
    console.error("Error processing vote for status update:", error);
  }
};

const AddComment = async (req, res) => {
  const { taskId } = req.params;
  const { content } = req.body;

  if (!req.user) {
    throw new ApiError(401, "Unauthorized access");
  }

  if (!content || content.trim() === "") {
    throw new ApiError(400, "Comment content cannot be empty");
  }

  try {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new ApiError(404, "Task not found");
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        taskId,
        authorId: req.user.id,
      },
      include: {
        author: true,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, comment, "Comment added successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to add comment");
  }
};

export {
  CreateTask,
  GetAllTasks,
  processVoteForStatusUpdate,
  GetTasksbyUser,
  AddComment,
  processTaskVotes,
  VoteonTask,
};
