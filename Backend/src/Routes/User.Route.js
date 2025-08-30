import { Router } from "express";
import {   RegisterUser,
  LogInUser,
  LogoutUser,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,updateAllUserRanks } from "../Controller/User.controller.js";

  import {verifyJWT} from "../Middleware/Auth.middleware.js"
  import {upload} from "../Middleware/Multer.js"



  const router = Router();

  router.route("/RegisterUser").post(RegisterUser)
   router.route("/LogInUser").post(LogInUser)
   router.route("/LogoutUser").post(verifyJWT ,LogoutUser)
   router.route("/changeCurrentPassword").post(verifyJWT ,changeCurrentPassword)
   router.route("/getCurrentUser").get(verifyJWT ,getCurrentUser)
   router.route("/updateAccountDetails").patch(verifyJWT ,updateAccountDetails)
   router.route("/updateUserAvatar").put(verifyJWT, upload.single("avatar") ,updateUserAvatar)

  router.route("/updateAllUserRanks").post(verifyJWT , updateAllUserRanks)





  export default router;