import { Router } from "express";

import { verifyJWT } from "../Middleware/Auth.middleware.js";
import { upload } from "../Middleware/Multer.js";

import {
  CreateTask,
  GetAllTasks,
 updateCivicScore,
  GetTasksbyUser,
  AddComment,
  VoteonTask,
} from "../Controller/Task.controller.js";

const router = Router();

router
  .route("/CreateTask")
  .post(verifyJWT, upload.single("imageUrl"), CreateTask);

router.route("/GetAllTasks").get(verifyJWT, GetAllTasks);

router.route("/Badge/updateCivicScore").patch(verifyJWT, updateCivicScore);


router.route("/GetTasksbyUser").get(verifyJWT, GetTasksbyUser);


router.route("/AddComment/:taskId").patch(verifyJWT, AddComment);

router.route("/VoteonTask/:taskId").patch(verifyJWT, VoteonTask);

export default router;
