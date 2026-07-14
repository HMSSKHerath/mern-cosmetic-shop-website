import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import { getStudent , createStudent } from "../controllers/studentController.js";

const studentRouter = express.Router();

studentRouter.get("/", authMiddleware, roleMiddleware, getStudent);
studentRouter.post("/", authMiddleware, roleMiddleware, createStudent);

export default studentRouter;