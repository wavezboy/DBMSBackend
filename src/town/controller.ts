import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
const prisma = new PrismaClient();

// Create a new town
export const createTown: RequestHandler = async (req, res) => {
  const { name, localGovernmentId } = req.body;

  try {
    const town = await prisma.town.create({
      data: {
        name,
        localGovernmentId,
      },
    });
    res.status(201).json(town);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all towns
export const getTowns: RequestHandler = async (req, res) => {
  try {
    const towns = await prisma.town.findMany({
      include: {
        localGovernment: true,
        schools: true,
      },
    });
    res.status(200).json(towns);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single town by ID
export const getTownById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const town = await prisma.town.findUnique({
      where: { id },
      include: {
        localGovernment: true,
        schools: true,
      },
    });
    if (!town) {
      return res.status(404).json({ error: "Town not found" });
    }
    res.status(200).json(town);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a town by ID
export const updateTown: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { name, localGovernmentId } = req.body;

  try {
    const town = await prisma.town.update({
      where: { id },
      data: {
        name,
        localGovernmentId,
      },
    });
    res.status(200).json(town);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a town by ID
export const deleteTown: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.town.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
