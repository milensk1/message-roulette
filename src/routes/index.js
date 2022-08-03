import express from "express";
import { Register, Login } from "../controllers/Users.js";
import { chat } from "../controllers/chat.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/", chat);

export default router;
