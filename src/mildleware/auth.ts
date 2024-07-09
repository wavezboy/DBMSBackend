import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const checkAuthUser: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    res.status(500).json("user not authenticated");
  }
};

// Middleware for role-based access
export const authorizeRoles = (...roles: string[]) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};
