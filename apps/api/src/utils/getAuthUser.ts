import type { Request } from "express";
import { AppError } from "./AppError.js";

export const getAuthUser = (req: Request) => {
  const user = req.user;
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
  return user;
};
