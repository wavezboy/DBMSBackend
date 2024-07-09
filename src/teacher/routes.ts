import express from "express";
import {
  createTeacher,
  getTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
} from "./controller";

const router = express.Router();

// Route to create a new teacher
router.post("/", createTeacher);

// Route to get all teachers
router.get("/", getTeachers);

// Route to get a single teacher by ID
router.get("/:id", getTeacherById);

// Route to update a teacher by ID
router.put("/:id", updateTeacher);

// Route to delete a teacher by ID
router.delete("/:id", deleteTeacher);

export default router;
