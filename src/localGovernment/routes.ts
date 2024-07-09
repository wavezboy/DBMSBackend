import express from "express";
import {
  createLocalGovernment,
  deleteLocalGovernment,
  getLocalGovernmentById,
  getLocalGovernments,
  updateLocalGovernment,
} from "./controller";

const router = express.Router();

// Route to create a new local government
router.post("/", createLocalGovernment);

// Route to get all local governments
router.get("/", getLocalGovernments);

// Route to get a single local government by ID
router.get("/:id", getLocalGovernmentById);

// Route to update a local government by ID
router.put("/:id", updateLocalGovernment);

// Route to delete a local government by ID
router.delete("/:id", deleteLocalGovernment);

export default router;
