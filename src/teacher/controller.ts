import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { generateTeacherId } from "../utils/generatetId";

const prisma = new PrismaClient();

// Create a new teacher
export const createTeacher: RequestHandler = async (req, res) => {
  const {
    firstName,
    lastName,
    imageId,
    currentSchoolId,
    addresses,
    isActive,
    pastSchools,
    isPrincipal,
    isHeadmaster,
  } = req.body;

  const teacherId = generateTeacherId();

  try {
    const teacher = await prisma.teacher.create({
      data: {
        teacherId,
        firstName,
        lastName,
        imageId,
        currentSchoolId,
        addresses,
        isActive,
        pastSchools,
        isPrincipal,
        isHeadmaster,
      },
    });
    res.status(201).json(teacher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all teachers
export const getTeachers: RequestHandler = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        currentSchool: true,
      },
    });
    res.status(200).json(teachers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single teacher by ID
export const getTeacherById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id },
      include: {
        currentSchool: true,
      },
    });
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a teacher by ID
export const updateTeacher: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const {
    teacherId,
    firstName,
    lastName,
    imageId,
    currentSchoolId,
    addresses,
    isActive,
    pastSchools,
    isPrincipal,
    isHeadmaster,
  } = req.body;

  try {
    const teacher = await prisma.teacher.update({
      where: { id },
      data: {
        teacherId,
        firstName,
        lastName,
        imageId,
        currentSchoolId,
        addresses,
        isActive,
        pastSchools,
        isPrincipal,
        isHeadmaster,
      },
    });
    res.status(200).json(teacher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a teacher by ID
export const deleteTeacher: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.teacher.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
