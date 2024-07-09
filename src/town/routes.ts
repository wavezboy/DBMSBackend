import express from "express";
const router = express.Router();
import {
  createTown,
  getTowns,
  getTownById,
  updateTown,
  deleteTown,
} from "./controller";

// Route to create a new town
router.post("/", createTown);

// Route to get all towns
router.get("/", getTowns);

// Route to get a single town by ID
router.get("/:id", getTownById);

// Route to update a town by ID
router.put("/:id", updateTown);

// Route to delete a town by ID
router.delete("/:id", deleteTown);

export default router;
