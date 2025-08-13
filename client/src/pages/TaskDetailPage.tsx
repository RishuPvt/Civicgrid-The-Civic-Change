
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth to get the current user

// Mock data for a single task.
const mockTask = {
  id: 1,
  title: 'Overflowing bin near India Gate',
  description: 'The main garbage bin near the east entrance has been overflowing for two days, creating an unsanitary situation for tourists and locals.',
  imageUrl: 'https://images.pexels.com/photos/4498155/pexels-photo-4498155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  location: 'India Gate, New Delhi',
  timeAgo: 'Reported 3 hours ago',
  validVotes: 2,
  invalidVotes: 1,
};

// Initial mock data for comments
const initialComments = [
    { user: 'Priya S.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705e', text: 'I can confirm this, I walk by here every day. It needs to be addressed quickly.' },
    { user: 'Rohan V.', avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', text: 'Has anyone notified the local municipal office?' },
];

const TaskDetailPage: React.FC = () => {
  const { taskId } = useParams();
  const { user } = useAuth(); // 2. Get the current logged-in user
  const [voted, setVoted] = useState<null | 'valid' | 'invalid'>(null);
  
  // 3. Use state to manage the list of comments and the new comment input
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '' || !user) return; // Don't submit empty comments or if not logged in

    // 4. Create a new comment object and add it to the comments array
    const commentToAdd = {
      user: user.name,
      avatar: user.avatar,
      text: newComment,
    };
    setComments([...comments, commentToAdd]);
    setNewComment(''); // Clear the input field
  };

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src={mockTask.imageUrl} alt={mockTask.title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{mockTask.title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-1.5" /> {mockTask.location}
            <Clock className="w-4 h-4 mr-1.5 ml-4" /> {mockTask.timeAgo}
          </div>
          <p className="text-gray-700 leading-relaxed">{mockTask.description}</p>
        </div>
      </div>

      {/* Verification Poll Section */}
      <div className="bg-white rounded-2xl shadow-lg mt-8 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Is this a valid issue?</h2>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setVoted('valid')}
            disabled={!!voted}
            className={`flex items-center justify-center space-x-2 p-4 rounded-lg transition-colors ${
              voted === 'valid' ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <ThumbsUp />
            <span>Yes, it's valid ({mockTask.validVotes + (voted === 'valid' ? 1 : 0)})</span>
          </button>
          <button
            onClick={() => setVoted('invalid')}
            disabled={!!voted}
            className={`flex items-center justify-center space-x-2 p-4 rounded-lg transition-colors ${
              voted === 'invalid' ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <ThumbsDown />
            <span>No, it's not valid ({mockTask.invalidVotes + (voted === 'invalid' ? 1 : 0)})</span>
          </button>
        </div>
        {voted && <p className="text-center text-sm text-green-600 mt-4">Thank you for your vote!</p>}
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-2xl shadow-lg mt-8 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" /> Community Discussion
        </h2>
        <div className="space-y-4 mb-6">
          {comments.map((comment, index) => (
            <div key={index} className="flex items-start space-x-3">
              <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full object-cover" />
              <div className="bg-gray-100 p-3 rounded-lg flex-1">
                <p className="font-semibold text-sm text-gray-800">{comment.user}</p>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
        {/* 5. Connect the form to the handleSubmit function */}
        <form onSubmit={handleCommentSubmit} className="flex items-center space-x-3">
          <input 
            type="text" 
            placeholder="Add your review or comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailPage;