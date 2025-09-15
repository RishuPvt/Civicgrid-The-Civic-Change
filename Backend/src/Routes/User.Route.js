import { Router } from "express";
import { prisma } from "../DB/DataBase.js";
import {
  RegisterUser,
  LogInUser,
  LogoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateAllUserRanks,
  getNearbyTasks
} from "../Controller/User.controller.js";

import { verifyJWT } from "../Middleware/Auth.middleware.js";
import { upload } from "../Middleware/Multer.js";

const router = Router();

router.route("/RegisterUser").post(RegisterUser);
router.route("/LogInUser").post(LogInUser);
router.route("/LogoutUser").post(verifyJWT, LogoutUser);
router.route("/changeCurrentPassword").post(verifyJWT, changeCurrentPassword);
router.route("/getCurrentUser").get(verifyJWT, getCurrentUser);
router.route("/updateAccountDetails").patch(verifyJWT, updateAccountDetails);
router
  .route("/updateUserAvatar")
  .put(verifyJWT, upload.single("avatar"), updateUserAvatar);

router.route("/updateAllUserRanks").post( updateAllUserRanks);

// Save/update user location
router.post("/save-location", verifyJWT, async (req, res) => {
  try {
    const { latitude, longitude, address } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Coordinates are required" });
    }

    // Update the logged-in user's coordinates
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id }, 
      data: {
        latitude,
        longitude,
       
      },
    });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error saving location" });
  }
});


router.route("/getNearbyTasks").get(verifyJWT, getNearbyTasks);


export default router;
