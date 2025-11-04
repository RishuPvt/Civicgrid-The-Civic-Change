import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Send,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { backendUrl } from "../API/BackendUrl";
import toast from "react-hot-toast";



const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams();
  const { user } = useAuth();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voted, setVoted] = useState<null | "valid" | "invalid">(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const statusMap = {
    PENDING_VERIFICATION: {
      text: "Pending Verification",
      color: "bg-yellow-500",
    },
    IN_PROGRESS: { text: "In Progress", color: "bg-blue-500" },
    COMPLETED: { text: "Completed", color: "bg-green-500" },
    REJECTED: { text: "Rejected", color: "bg-red-500" },
  };

  // Fetch initial task data on component mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${backendUrl}/users/task/getTaskDetails/${taskId}`
        );
        const fetchedTask = response.data.data;

        // Determine if the current user has already voted
        if (fetchedTask.votes && user) {
          const userVote = fetchedTask.votes.find(
            (vote) => vote.voterId === user.id
          );
          if (userVote) {
            setVoted(userVote.type === "valid" ? "valid" : "invalid");
          }
        }

         if (fetchedTask.comments) {
            const formattedComments = fetchedTask.comments.map(comment => ({
                user: comment.author.name,
                avatar: comment.author.avatar,
                text: comment.content,
            }));
            setComments(formattedComments);
        }


        // Set vote counts from fetched data
        const validVotes = fetchedTask.votes
          ? fetchedTask.votes.filter((vote) => vote.value === true).length
          : 0;
        const invalidVotes = fetchedTask.votes
          ? fetchedTask.votes.filter((vote) => vote.value === false).length
          : 0;

        setTask({ ...fetchedTask, validVotes, invalidVotes });
      } catch (err) {
        toast.error("Failed to fetch task details:");
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId, user]);

  // New vote handler that calls the backend API
  const handleVote = async (voteValue) => {
    if (voted || !user) {
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/users/task/VoteonTask/${taskId}`,
        { value: voteValue },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
      // Update local state after successful vote
      setVoted(voteValue ? "valid" : "invalid");

      setTask((prevTask) => ({
        ...prevTask,
        validVotes: prevTask.validVotes + (voteValue ? 1 : 0),
        invalidVotes: prevTask.invalidVotes + (!voteValue ? 1 : 0),
      }));
    } catch (error: any) {
      if (error) {
        toast.error(error.res.data.message);
      } else {
        toast.error("Failed to cast vote:", error);
      }
    }
  };

  //  updated handleCommentSubmit function

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "" || !user || !taskId) return;

    try {
      // Step 1: Make the API call to add the comment
      const response = await axios.post(
        `${backendUrl}/users/task/AddComment/${taskId}`,
        { content: newComment },
        { withCredentials: true }
      );

      // Step 2: Extract the data from the backend response
      const newCommentData = response.data.data;

      // Step 3: Add the new comment to the comments state
      // The backend `include: { author: true }` makes this possible
      const commentToAdd = {
        user: newCommentData.author.name,
        avatar: newCommentData.author.avatar,
        text: newCommentData.content,
      };

      setComments([...comments, commentToAdd]);

      // Step 4: Clear the input field
      setNewComment("");

  
    } catch (error) {
      toast.error("Failed to add comment:");
      // Show an error toast message from the backend
      const errmessage =
        error.response?.data?.message ||
          "Failed to add comment. Please try again."

      toast.error(errmessage);
    }
  };
  const handlePrevImage = () => {
    // Only run the logic if task and its imageUrls exist
    if (task && task.imageUrl && task.imageUrl.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? task.imageUrl.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextImage = () => {
    // Only run the logic if task and its imageUrls exist
    if (task && task.imageUrl && task.imageUrl.length > 0) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === task.imageUrl.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }
  if (!task) {
    return <div className="text-center py-10">Task not found.</div>;
  }
  const taskStatus = statusMap[task.status] || {
    text: task.status,
    color: "bg-gray-500",
  };
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Main Task Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300 ease-in-out"
        >
          <div className="relative">
            {/* Image Carousel and overlay content */}
            <div className="relative w-full h-80 sm:h-96 overflow-hidden">
              {task.imageUrl && task.imageUrl.length > 0 ? (
                <AnimatePresence initial={false} mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={task.imageUrl[currentImageIndex]}
                    alt={`${task.title} - ${currentImageIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
                  No images available
                </div>
              )}

              {task.imageUrl && task.imageUrl.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
            <div className="absolute bottom-0 left-0 p-8 text-white z-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-2 leading-tight drop-shadow-lg">
                {task.title}
              </h1>
              <div className="flex items-center text-sm sm:text-base text-gray-200">
                <MapPin className="w-4 h-4 mr-1.5" /> {task.latitude}{" "}
                {task.longitude}
                <Clock className="w-4 h-4 mr-1.5 ml-4" />
                {new Date(task.createdAt).toLocaleString()}
              </div>
            </div>
          </div>

          {/* New Content Section Below the Image */}
          <div className="p-8 space-y-6">
            {/* Status Badge and Creator Details */}
            <div className="flex justify-between items-center">
              {/* Status Badge */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-bold text-white ${taskStatus.color}`}
              >
                {taskStatus.text}
              </span>

              {/* Creator Information */}
              {task.creator && (
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-800">
                    Reported by {task.creator.name}
                  </span>
                  <img
                    src={
                      task.creator.avatar || "https://i.pravatar.cc/150?img=68"
                    }
                    alt={task.creator.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-green-500"
                  />
                </div>
              )}
            </div>

            {/* Task Description */}
            <p className="text-gray-700 leading-relaxed text-lg">
              {task.description}
            </p>
          </div>
        </motion.div>

        {/* Verification Poll Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Is this a valid issue?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVote(true)} // Calls the vote handler
              disabled={!!voted || !user} // Disable if already voted or not logged in
              className={`flex items-center justify-center space-x-2 p-4 rounded-xl font-semibold transition-colors shadow-md ${
                voted === "valid"
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-green-500 hover:text-white disabled:opacity-50"
              }`}
            >
              <ThumbsUp />
              <span>
                Yes, it's valid ({task.validVotes + (voted === "valid" ? 1 : 0)}
                )
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleVote(false)} // Calls the vote handler
              disabled={!!voted || !user} // Disable if already voted or not logged in
              className={`flex items-center justify-center space-x-2 p-4 rounded-xl font-semibold transition-colors shadow-md ${
                voted === "invalid"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white disabled:opacity-50"
              }`}
            >
              <ThumbsDown />
              <span>
                No, it's not valid (
                {task.invalidVotes + (voted === "invalid" ? 1 : 0)})
              </span>
            </motion.button>
          </div>
          {voted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center text-sm text-green-600 font-medium mt-4"
            >
              Thank you for your vote! Your input helps the community.
            </motion.p>
          )}
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-6 sm:p-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <MessageSquare className="w-6 h-6 mr-2 text-green-500" /> Community
            Discussion
          </h2>
          <div className="space-y-6 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {comments.map((comment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-start space-x-4"
              >
                <img
                  src={comment.avatar}
                  alt={comment.user}
                  className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-gray-200"
                />
                <div className="bg-gray-100 p-4 rounded-2xl flex-1 transform transition-transform hover:scale-[1.02]">
                  <p className="font-bold text-gray-900 text-base">
                    {comment.user}
                  </p>
                  <p className="text-gray-700 text-sm mt-1">{comment.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Comment Form */}
          {user && (
            <motion.form
              onSubmit={handleCommentSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center space-x-3 mt-4"
            >
              <input
                type="text"
                placeholder="Add your review or comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-full bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              <button
                type="submit"
                className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400"
                disabled={newComment.trim() === ""}
              >
                <Send className="w-5 h-5" />
              </button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
