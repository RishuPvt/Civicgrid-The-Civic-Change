import { Router } from "express";

import { verifyJWT } from "../Middleware/Auth.middleware.js";
import { upload } from "../Middleware/Multer.js";

import {
  createReward,
  AllReward,
  DeleteReward,
  ClaimedReward,
  UserClaimedReward,
} from "../Controller/Reward.controller.js";

const router = Router();

router
  .route("/admin/createReward")
  .post(verifyJWT, upload.single("imageUrl"), createReward);

router.route("/AllReward").get(verifyJWT, AllReward);

router.route("/admin/DeleteReward/:rewardId").delete(verifyJWT, DeleteReward);

router.route("/ClaimedReward/:rewardId").get(verifyJWT, ClaimedReward);

router.route("/UserClaimedReward").get(verifyJWT, UserClaimedReward);

export default router;
