import ApiError from "../Utility/ApiError.js";
import ApiResponse from "../Utility/ApiResponse.js";
import {
  uploadOnCloudinary,
  deleteOnCloudinary,
} from "../Utility/cloudinary.js";
import { prisma } from "../DB/DataBase.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Utility function to generate JWT tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

// ------------------ Handlers ------------------

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      newUser.id
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite : "None",

    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          201,
          { user: newUser, accessToken, refreshToken },
          "User registered successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to register user");
  }
};

const LogInUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(404, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user.id
    );

    const loggedInUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const cookieOptions = {
      httpOnly: true,
    secure: true, 
    sameSite: "None",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions)
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, accessToken, refreshToken },
          "User logged in successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to log in");
  }
};

const LogoutUser = async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized access");
  }

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite : "None",
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
};

const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!req.user) {
    throw new ApiError(401, "Unauthorized access");
  }

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid old password");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: req.user.id },
      data: {
        password: hashedNewPassword,
      },
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password updated successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to change password");
  }
};

const getCurrentUser = async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized access");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        civicScore: true,
        rank: true,
        badges: true,
        longitude: true,
        latitude: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Current user fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to fetch user");
  }
};

const updateAccountDetails = async (req, res) => {
  const { name, email, latitude, longitude } = req.body;

  if (!req.user) {
    throw new ApiError(401, "Unauthorized access");
  }

  // Check if at least one field is provided
  if (!name && !email && !longitude && !latitude) {
    throw new ApiError(
      400,
      "At least one field (name, email, or address) is required"
    );
  }

  try {
    // If email is provided, check for uniqueness
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser && existingUser.id !== req.user.id) {
        throw new ApiError(409, "Email already in use");
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        name: name || undefined,
        email: email || undefined,
        longitude: longitude || undefined,
        latitude: latitude || undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        longitude: true,
        longitude: true,
        updatedAt: true,
      },
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedUser,
          "Account details updated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      error.message || "Failed to update account details"
    );
  }
};

const updateUserAvatar = async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "Unauthorized access");
  }

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const oldAvatarUrl = user.avatar;

    // Upload the new avatar to Cloudinary
    const newAvatar = await uploadOnCloudinary(avatarLocalPath);

    if (!newAvatar || !newAvatar.url) {
      throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }

    // Update the user's avatar URL in the database
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        avatar: newAvatar.url,
      },
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    });

    // Delete the old avatar from Cloudinary if it exists
    if (oldAvatarUrl) {
      await deleteOnCloudinary(oldAvatarUrl);
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedUser, "User avatar updated successfully")
      );
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to update user avatar");
  }
};

const updateAllUserRanks = async (req, res) => {
  try {
    // Fetch all users sorted by civicScore
    const users = await prisma.user.findMany({
      orderBy: { civicScore: "desc" },
      select: {
        id: true,
        civicScore: true,
        name: true,
        avatar: true,
        badges: true,
      },
    });

    // Update ranks and collect updated user objects
    const updatedUsers = await Promise.all(
      users.map(async (user, index) => {
        const newRank = index + 1;
        return prisma.user.update({
          where: { id: user.id },
          data: { rank: newRank },
          select: {
            id: true,
            name: true,
            avatar: true,
            badges: true,
            civicScore: true,
            rank: true, // ✅ include rank in response
          },
        });
      })
    );

    return res.status(200).json({
      message: "User ranks updated successfully.",
      updatedCount: updatedUsers.length,
      users: updatedUsers, // ✅ return updated users with ranks
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Failed to update user ranks.",
    });
  }
};


// Haversine formula to calculate distance between two lat/lon in km
const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const toRad = (val) => (val * Math.PI) / 180;

  const R = 6371; // Earth radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in km
};

 const getNearbyTasks = async (req, res) => {
  try {
    const userId = req.user?.id; 
    if (!userId) {
      throw new ApiError(401, "User not authenticated");
    }

    // Fetch user location
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { latitude: true, longitude: true },
    });

    if (!user?.latitude || !user?.longitude) {
      throw new ApiError(400, "User location not set");
    }

    const tasks = await prisma.task.findMany({
      where: { status: "PENDING_VERIFICATION" }, 
      include: {
        creator: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter tasks by radius (e.g., 10km)
    const radiusKm = parseFloat(req.query.radius) || 10;

    const nearbyTasks = tasks.filter((task) => {
      const distance = getDistanceInKm(
        user.latitude,
        user.longitude,
        task.latitude,
        task.longitude
      );
      return distance <= radiusKm;
    });

    return res
      .status(200)
      .json(new ApiResponse(200, nearbyTasks, "Nearby tasks fetched successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "Failed to fetch nearby tasks");
  }
};

export {
  RegisterUser,
  LogInUser,
  LogoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateAllUserRanks,
  getNearbyTasks
};

// const geocodingService = async (address) => {
//     // This is a placeholder for your geocoding API call.
//     // Replace with your actual geocoding service logic (e.g., Google Maps, Mapbox, etc.)
//     const GEOCODING_API_KEY = process.env.GEOCODING_API_KEY;
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODING_API_KEY}`;

//     try {
//         const response = await axios.get(url);
//         const data = response.data;

//         if (data.status === "OK" && data.results.length > 0) {
//             const result = data.results[0];
//             return {
//                 formattedAddress: result.formatted_address,
//                 latitude: result.geometry.location.lat,
//                 longitude: result.geometry.location.lng,
//             };
//         } else {
//             return null;
//         }
//     } catch (error) {
//         throw new ApiError(500, "Geocoding service failed");
//     }
// };

// const updateAccountDetails = asyncHandler(async (req, res) => {
//     const { name, email, address } = req.body;

//     // Ensure the user is authenticated via middleware
//     if (!req.user) {
//         throw new ApiError(401, "Unauthorized access");
//     }

//     // Check if at least one field is provided
//     if (!name && !email && !address) {
//         throw new ApiError(400, "At least one field (name, email, or address) is required");
//     }

//     const updateData = {};
//     if (name) updateData.name = name;
//     if (email) updateData.email = email;

//     // **Address Validation and Geocoding Logic**
//     if (address) {
//         const geocodeResult = await geocodingService(address);

//         if (!geocodeResult) {
//             throw new ApiError(400, "Invalid address provided");
//         }

//         updateData.address = geocodeResult.formattedAddress;
//         updateData.latitude = geocodeResult.latitude;
//         updateData.longitude = geocodeResult.longitude;
//     }

//     // If email is provided, check for uniqueness
//     if (email) {
//         const existingUser = await prisma.user.findUnique({
//             where: { email },
//         });
//         if (existingUser && existingUser.id !== req.user.id) {
//             throw new ApiError(409, "Email already in use");
//         }
//     }

//     try {
//         const updatedUser = await prisma.user.update({
//             where: { id: req.user.id },
//             data: updateData,
//             select: {
//                 id: true,
//                 name: true,
//                 email: true,
//                 address: true,
//                 latitude: true,
//                 longitude: true,
//                 updatedAt: true,
//             },
//         });

//         return res
//             .status(200)
//             .json(
//                 new ApiResponse(200, updatedUser, "Account details updated successfully")
//             );
//     } catch (error) {
//         // Handle specific Prisma errors or generic server errors
//         throw new ApiError(500, error.message || "Failed to update account details");
//     }
// });
