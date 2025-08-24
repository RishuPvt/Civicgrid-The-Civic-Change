import ApiError from "../Utility/ApiError.js";
import jwt from "jsonwebtoken";
import {prisma} from "../DB/DataBase.js";

export const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {;
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decodedToken?.id },
    });

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    
    next();
  } catch (error) {
    return res.status(401).json(new ApiError(401, error?.message || "Invalid access token"));
  }
};

