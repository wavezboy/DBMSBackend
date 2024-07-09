import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";
import { generateStudentId } from "../utils/generatetId";

const prisma = new PrismaClient();

// Create a new student
export const createStudent: RequestHandler = async (req, res) => {
  const {
    school,
    schoolId,
    firstName,
    lastName,
    imageId,
    parentsOrGuidians,
    addresses,
    dateOfBirth,
    gender,
    class: studentClass,
    previousClasses,
  } = req.body;

  const studentId = generateStudentId();

  try {
    const student = await prisma.student.create({
      data: {
        studentId,
        firstName,
        lastName,
        imageId,
        parentsOrGuidians,
        addresses,
        dateOfBirth,
        gender,
        class: studentClass,
        previousClasses,
        school,
        schoolId,
      },
    });
    res.status(201).json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all students
export const getStudents: RequestHandler = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        results: true,
      },
    });
    res.status(200).json(students);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single student by ID
export const getStudentById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await prisma.student.findUnique({
      where: { id },
      include: {
        results: true,
      },
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student by ID
export const updateStudent: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const {
    studentId,
    firstName,
    lastName,
    imageId,
    parentsOrGuidians,
    addresses,
    dateOfBirth,
    gender,
    class: studentClass,
    previousClasses,
  } = req.body;

  try {
    const student = await prisma.student.update({
      where: { id },
      data: {
        studentId,
        firstName,
        lastName,
        imageId,
        parentsOrGuidians,
        addresses,
        dateOfBirth,
        gender,
        class: studentClass,
        previousClasses,
      },
    });
    res.status(200).json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a student by ID
export const deleteStudent: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.student.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
