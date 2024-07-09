import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const prisma = new PrismaClient();

// Create a new result
export const createResult: RequestHandler = async (req, res) => {
  const {
    studentName,
    studentId,
    class: studentClass,
    term,
    year,
    // details is json of result
    details,
  } = req.body;

  try {
    const result = await prisma.result.create({
      data: {
        studentName,
        studentId,
        class: studentClass,
        term,
        year,
        details,
        student: { connect: { id: studentId } },
      },
    });
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get all results
export const getResults: RequestHandler = async (req, res) => {
  try {
    const results = await prisma.result.findMany({
      include: {
        student: true,
      },
    });
    res.status(200).json(results);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single result by ID
export const getResultById: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await prisma.result.findUnique({
      where: { id },
      include: {
        student: true,
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a result by ID
export const updateResult: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const {
    studentName,
    studentId,
    class: studentClass,
    term,
    year,
    details,
  } = req.body;

  try {
    const result = await prisma.result.update({
      where: { id },
      data: {
        studentName,
        studentId,
        class: studentClass,
        term,
        year,
        details,
        student: { connect: { id: studentId } },
      },
    });
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a result by ID
export const deleteResult: RequestHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.result.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
