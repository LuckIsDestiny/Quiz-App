import type { NextFunction, Request, RequestHandler, Response } from "express";

export const catchAsync = (fn: RequestHandler) => {
  return (_req: Request, _res: Response, next: NextFunction) => {
    Promise.resolve(fn).catch(next);
  };
};
