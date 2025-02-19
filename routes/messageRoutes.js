import { Router } from "express";
import {
  getMessages,
  getUsers,
  sendMessage,
} from "../controllers/messageController.js";
const router = Router();
router.get("/", getUsers);
router.get("/:id", getMessages);
router.get("send//:id", sendMessage);
export default router;
