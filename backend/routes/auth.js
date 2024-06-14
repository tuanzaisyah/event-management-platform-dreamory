import express from "express";
import {
  login,
  logout,
  register,
  verifyPassword,
} from "../controller/authController.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/verifyPassword", verifyPassword);

router.post("/logout", logout);

export default router;
