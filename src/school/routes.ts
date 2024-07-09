import express from "express";

const router = express.Router();
import {
  createSchool,
  getSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} from "./controller";

// Route to create a new school
router.post("/", createSchool);

// Route to get all schools
router.get("/", getSchools);

// Route to get a single school by ID
router.get("/:id", getSchoolById);

// Route to update a school by ID
router.put("/:id", updateSchool);

// Route to delete a school by ID
router.delete("/:id", deleteSchool);

export default router;
