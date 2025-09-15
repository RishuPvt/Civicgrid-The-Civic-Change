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
  getTaskDetails
} from "../Controller/Task.controller.js";

const router = Router();

router
  .route("/CreateTask")
  .post(verifyJWT, upload.array("imageUrl"), CreateTask);

router.route("/GetAllTasks").get(verifyJWT, GetAllTasks);

router.route("/Badge/updateCivicScore").patch(verifyJWT, updateCivicScore);


router.route("/GetTasksbyUser").get(verifyJWT, GetTasksbyUser);


router.route("/AddComment/:taskId").post(verifyJWT, AddComment);

router.route("/VoteonTask/:taskId").post(verifyJWT, VoteonTask);

router.route("/getTaskDetails/:taskId").get(  getTaskDetails);


export default router;
