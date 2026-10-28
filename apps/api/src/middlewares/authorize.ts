import type { NextFunction, Request, Response } from "express";
import type { Role } from "../generated/prisma/enums.js";
import { getAuthUser } from "../utils/getAuthUser.js";
import { AppError } from "../utils/AppError.js";

export const authorize = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = getAuthUser(req);

    if (!roles.includes(user.role)) {
      return next(new AppError("Forbidden", 403));
    }
    next();
  };
};
