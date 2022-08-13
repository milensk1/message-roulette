import express from "express";
import { verifyEndpoint } from "./middleware/authentication.js";
import { register, login } from "./domain/users/controller.js";
import { spin, wild, blast } from "./domain/messages/controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/spin", verifyEndpoint, spin);
router.post("/wild", verifyEndpoint, wild);
router.post("/blast", verifyEndpoint, blast);

export default router;
