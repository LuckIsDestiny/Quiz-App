import type { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";

type InputFormat = "body" | "params" | "query";

export const validate = (
  schema: z.ZodType,
  format: InputFormat = "body",
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (format === "query") {
        res.locals[format] = schema.parse(req[format]);
      } else {
        req[format] = schema.parse(req[format]);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
