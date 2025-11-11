import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Gift, Lock, CheckCircle, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { backendUrl } from "../API/BackendUrl";
import axios from "axios";

const Rewards: React.FC = () => {
  const { user } = useAuth();
  const [rewardsData, setRewardsData] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);

  // ✅ Fetch all available rewards
  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const response = await fetch(`${backendUrl}/AllReward`);
        const data = await response.json();

        if (data.success) {
          setRewardsData(data.data);
        } else {
          toast.error(data.message || "Failed to fetch rewards.");
        }
      } catch (error) {
        console.error("Error fetching rewards:", error);
        toast.error("An error occurred while fetching rewards.");
      }
    };

    fetchRewards();
  }, []);

  // ✅ Fetch current user and their score
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/users/getCurrentUser`, {
          withCredentials: true,
        });
        setCurrentUser(res.data.data);
        setUserScore(res.data.data.civicScore);
      } catch (err) {
        toast.error("Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ Fetch user's claimed rewards
  useEffect(() => {
    const fetchClaimedRewards = async () => {
      try {
        const res = await axios.get(`${backendUrl}/UserClaimedReward`, {
          withCredentials: true,
        });
        const claimed = res.data.data.map(
          (claim: any) => claim.reward.id // extract reward IDs
        );
        setClaimedRewards(claimed);
      } catch (err: any) {
        if (err.response?.status !== 404) {
          toast.error("Failed to fetch claimed rewards.");
        }
      }
    };

    fetchClaimedRewards();
  }, []);

  // ✅ Handle claiming a reward
  const handleClaimReward = async (rewardId: string, pointsReq: number) => {
    try {
      if (claimedRewards.includes(rewardId)) {
        toast.info("You have already claimed this reward.");
        return;
      }

      const response = await axios.get(
        `${backendUrl}/ClaimedReward/${rewardId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success("🎉 Reward claimed successfully!");
        setUserScore((prev) => prev - pointsReq);
        setClaimedRewards((prev) => [...prev, rewardId]);
      } else {
        toast.error(response.data?.message || "Failed to claim reward.");
      }
    } catch (error: any) {
      console.error("Error claiming reward:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to claim reward. Please try again later."
      );
    }
  };

  // The milestones can remain as they represent the goals for all users.
  const milestones = [
    {
      points: 500,
      title: "Civic Starter",
      description: "Welcome to the community!",
      achieved: userScore >= 500,
    },
    {
      points: 1000,
      title: "Community Helper",
      description: "Making a difference daily",
      achieved: userScore >= 1000,
    },
    {
      points: 2500,
      title: "Civic Champion",
      description: "Leading by example",
      achieved: userScore >= 2500,
    },
    {
      points: 5000,
      title: "Community Leader",
      description: "Inspiring others to act",
      achieved: userScore >= 5000,
    },
  ];

  const nextMilestone = milestones.find((m) => !m.achieved);
  const progressToNext = nextMilestone
    ? (userScore / nextMilestone.points) * 100
    : 100;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading rewards...</p>
      </div>
    );
  }

 return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-bold text-3xl text-gray-900 mb-2">Civic Rewards</h1>
          <p className="text-gray-600">
            Earn points through civic activities and unlock exclusive rewards.
          </p>
        </motion.div>
{/* ✅ Progress Overview */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
  className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white mb-8"
>
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="font-bold text-2xl mb-2">Your Progress</h2>
      <p className="text-green-100">
        Keep earning points to unlock more rewards!
      </p>
    </div>
    <div className="text-right">
      <div className="text-3xl font-bold">{userScore.toLocaleString()}</div>
      <div className="text-green-200">Current Points</div>
    </div>
  </div>

  {nextMilestone && (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">
          Progress to {nextMilestone.title}
        </span>
        <span className="text-green-200">
          {nextMilestone.points - userScore} points to go
        </span>
      </div>
      <div className="w-full bg-white/20 rounded-full h-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progressToNext, 100)}%` }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="bg-yellow-400 h-3 rounded-full"
        />
      </div>
    </div>
  )}
</motion.div>

        {/* ✅ Rewards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewardsData.map((reward, index) => {
            const canClaim = userScore >= reward.pointsReq;
            const isClaimed = claimedRewards.includes(reward.id);

            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={reward.imageUrl}
                    alt={reward.title}
                    className={`w-full h-48 object-cover ${
                      !canClaim && !isClaimed ? "filter grayscale" : ""
                    }`}
                  />
                  <div className="absolute top-4 right-4">
                    {isClaimed ? (
                      <div className="bg-green-500 text-white p-2 rounded-full">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                    ) : canClaim ? (
                      <div className="bg-yellow-400 text-gray-900 p-2 rounded-full">
                        <Gift className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="bg-gray-400 text-white p-2 rounded-full">
                        <Lock className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {reward.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {reward.description}
                  </p>

                  {isClaimed ? (
                    <button
                      disabled
                      className="w-full bg-gray-100 text-gray-500 py-3 rounded-2xl font-medium"
                    >
                      Claimed ✓
                    </button>
                  ) : canClaim ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleClaimReward(reward.id, reward.pointsReq)}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-shadow"
                    >
                      Claim Reward
                    </motion.button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-100 text-gray-400 py-3 rounded-2xl font-medium cursor-not-allowed"
                    >
                      {(reward.pointsReq - userScore).toLocaleString()} more points needed
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


export default Rewards;
