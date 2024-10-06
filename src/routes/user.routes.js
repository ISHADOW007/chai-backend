import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { app } from "../app.js";

const router = Router();
console.log("hiii")
router.route("/register").get(registerUser); // Ensure this line is correct
console.log("hiii")
export default router;
