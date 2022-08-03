import express from "express";
import { verifyToken } from "./middleware/verifyToken.js";
import { register, login } from "./domain/users/controller.js";
import { spin, wild, blast } from "./domain/messages/controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/spin", verifyToken, spin);
router.post("/wild", verifyToken, wild);
router.post("/blast", verifyToken, blast);

export default router;
