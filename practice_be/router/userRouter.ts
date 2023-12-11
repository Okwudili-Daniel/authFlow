import { Router } from "express";
import {
  changeUserPassword,
  createUser,
  getAllUser,
  getAllUsers,
  logOutUser,
  resetUserPassword,
  signInUser,
  verifyUser,
} from "../controller/userController";
import validaor from "../utils/validaor";
import { registerValidator } from "../utils/userValidator";
import { authorized } from "../utils/authorize";
import { authorization } from "../utils/authorization";

const router: Router = Router();

router.route("/create-user").post(validaor(registerValidator), createUser);
router.route("/verify-user").patch(verifyUser);
router.route("/sign-in-user").post(signInUser);
router.route("/get-user").get(authorized, getAllUser);
router.route("/get-user").get(authorization, getAllUsers);
router.route("/change-password/:userID").patch(changeUserPassword);
router.route("/logout").get(logOutUser);
router.route("/reset-user-password").patch(resetUserPassword);

export default router;
