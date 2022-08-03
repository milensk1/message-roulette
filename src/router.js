import express from "express";
import { verifyToken } from "./middleware/verifyToken.js";
import { register, login } from "./domain/users/controller.js";
import { spin, wild, blast } from "./domain/messages/controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/spin", verifyToken, spin);
router.get("/wild", verifyToken, wild);
router.get("/blast", verifyToken, blast);

export default router;
