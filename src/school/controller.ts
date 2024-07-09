import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

// Create a new school
const createSchool: RequestHandler = async (req, res) => {
  const { specialId, name, address, localGovernmentId, townId } = req.body;

  try {
    const school = await prisma.school.create({
      data: {
        specialId,
        name,
        address,
        localGovernmentId,
        townId,
      },
    });
    res.status(201).json(school);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all schools
const getSchools: RequestHandler = async (req, res) => {
  try {
    const schools = await prisma.school.findMany({
      include: {
        localGovernment: true,
        town: true,
        teachers: true,
      },
    });
    res.status(200).json(schools);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single school by ID
const getSchoolById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const school = await prisma.school.findUnique({
      where: { id },
      include: {
        localGovernment: true,
        town: true,
        teachers: true,
      },
    });
    if (!school) {
      return res.status(404).json({ error: "School not found" });
    }
    res.status(200).json(school);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a school by ID
const updateSchool: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const { specialId, name, address, localGovernmentId, townId } = req.body;

  try {
    const school = await prisma.school.update({
      where: { id },
      data: {
        specialId,
        name,
        address,
        localGovernmentId,
        townId,
      },
    });
    res.status(200).json(school);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a school by ID
const deleteSchool: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.school.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { createSchool, getSchools, getSchoolById, updateSchool, deleteSchool };
