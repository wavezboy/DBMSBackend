import express from "express";
import {
  createResult,
  getResults,
  getResultById,
  updateResult,
  deleteResult,
} from "./controller";

const router = express.Router();

// Route to create a new result
router.post("/", createResult);

// Route to get all results
router.get("/", getResults);

// Route to get a single result by ID
router.get("/:id", getResultById);

// Route to update a result by ID
router.put("/:id", updateResult);

// Route to delete a result by ID
router.delete("/:id", deleteResult);

export default router;
