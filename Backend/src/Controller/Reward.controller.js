import ApiError from "../Utility/ApiError.js";
import ApiResponse from "../Utility/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteOnCloudinary,
} from "../Utility/cloudinary.js";
import { prisma } from "../DB/DataBase.js";

const createReward = async (req, res) => {
  const { name, description, pointsReq } = req.body;
  const imageUrlLocalPath = req.file?.path;

//   if (!req.user || req.user.role !== "ADMIN") {
//     throw new ApiError(403, "You are not authorized to create a reward.");
//   }

  if (!name || !pointsReq) {
    throw new ApiError(400, "Name and points required are needed.");
  }

  try {
    const imageUrl = imageUrlLocalPath
      ? await uploadOnCloudinary(imageUrlLocalPath)
      : null;
    if (imageUrlLocalPath && !imageUrl) {
      throw new ApiError(500, "Failed to upload image to Cloudinary");
    }

    const newReward = await prisma.reward.create({
      data: {
        name,
        description,
        pointsReq: parseInt(pointsReq),
        imageUrl: imageUrl?.url,
      },
    });

    return res
      .status(201)
      .json(new ApiResponse(201, newReward, "Reward created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to create reward.");
  }
};

const AllReward = async (req, res) => {
  try {
    const rewards = await prisma.reward.findMany();

    return res
      .status(200)
      .json(new ApiResponse(200, rewards, "Rewards fetched successfully."));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to fetch rewards.");
  }
};

const DeleteReward = async (req, res) => {
  const { rewardId } = req.params;

  if (!req.user || req.user.role !== "ADMIN") {
    throw new ApiError(403, "You are not authorized to delete a reward.");
  }

  try {
    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
    });

    if (!reward) {
      throw new ApiError(404, "Reward not found.");
    }

    await prisma.rewardClaim.deleteMany({
      where: { rewardId: rewardId },
    });
    await prisma.reward.delete({
      where: { id: rewardId },
    });

    if (reward.imageUrl) {
      await deleteOnCloudinary(reward.imageUrl);
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Reward deleted successfully."));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to delete reward.");
  }
};

// User-Reward Handlers

const ClaimedReward = async (req, res) => {
  const { rewardId } = req.params;

  if (!req.user) {
    throw new ApiError(401, "Unauthorized access.");
  }

  try {
    const reward = await prisma.reward.findUnique({
      where: { id: rewardId },
    });
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!reward || !user) {
      throw new ApiError(404, "Reward or user not found.");
    }

    if (user.civicScore < reward.pointsReq) {
      throw new ApiError(400, "Insufficient civic score to claim this reward.");
    }

    const alreadyClaimed = await prisma.rewardClaim.findFirst({
      where: {
        userId: req.user.id,
        rewardId: rewardId,
      },
    });

    if (alreadyClaimed) {
      throw new ApiError(409, "You have already claimed this reward.");
    }

    const newCivicScore = user.civicScore - reward.pointsReq;

    await prisma.$transaction([
      prisma.user.update({
        where: { id: req.user.id },
        data: {
          civicScore: newCivicScore,
        },
      }),
      prisma.rewardClaim.create({
        data: {
          userId: req.user.id,
          rewardId: rewardId,
        },
      }),
    ]);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          null,
          "Reward claimed and points deducted successfully."
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to claim reward.");
  }
};

const UserClaimedReward = async (req, res) => {
  const userId = req.user.id;

  try {
    const claimedRewards = await prisma.rewardClaim.findMany({
      where: { userId },
      include: {
        reward: true, // This will fetch the reward details for each claim
      },
    });

    if (claimedRewards.length === 0) {
      throw new ApiError(404, "No claimed rewards found for this user.");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          claimedRewards,
          "User's claimed rewards fetched successfully."
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Failed to fetch claimed rewards."
    );
  }
};

export { createReward, AllReward, DeleteReward , ClaimedReward ,UserClaimedReward };
