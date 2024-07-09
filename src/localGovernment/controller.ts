import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

// Create a new local government
const createLocalGovernment: RequestHandler = async (req, res) => {
  const { name } = req.body;

  try {
    const localGovernment = await prisma.localGovernment.create({
      data: { name },
    });
    res.status(201).json(localGovernment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all local governments
const getLocalGovernments: RequestHandler = async (req, res) => {
  try {
    const localGovernments = await prisma.localGovernment.findMany({
      include: {
        towns: true,
        schools: true,
      },
    });
    res.status(200).json(localGovernments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single local government by ID
const getLocalGovernmentById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const localGovernment = await prisma.localGovernment.findUnique({
      where: { id },
      include: {
        towns: true,
        schools: true,
      },
    });
    if (!localGovernment) {
      return res.status(404).json({ error: "Local government not found" });
    }
    res.status(200).json(localGovernment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a local government by ID
const updateLocalGovernment: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const localGovernment = await prisma.localGovernment.update({
      where: { id },
      data: { name },
    });
    res.status(200).json(localGovernment);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a local government by ID
const deleteLocalGovernment: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.localGovernment.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createLocalGovernment,
  getLocalGovernments,
  getLocalGovernmentById,
  updateLocalGovernment,
  deleteLocalGovernment,
};
