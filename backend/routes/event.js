import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
  addEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controller/eventController.js";

const router = express.Router();

router.post("/", verifyToken, addEvent);

router.put("/:id", verifyToken, updateEvent);

router.get("/:id", verifyToken, getEvent);

router.get("/", getEvents);

router.delete("/:id", verifyToken, deleteEvent);

export default router;
