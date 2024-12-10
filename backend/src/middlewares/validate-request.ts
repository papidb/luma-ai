import { NextFunction, Request, Response } from "express";

import { z, ZodSchema } from "zod";

type Schemas = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
  headers?: ZodSchema;
};

/**
 * Middleware to validate request data using Zod schemas.
 * @param schemas - Object containing Zod schemas for body, query, params, and headers.
 */
export const validateRequest = (schemas: Schemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) schemas.body.parse(req.body);
      if (schemas.query) schemas.query.parse(req.query);
      if (schemas.params) schemas.params.parse(req.params);
      if (schemas.headers) schemas.headers.parse(req.headers);

      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      if (err instanceof z.ZodError) {
         res.status(400).json({
          message: "Validation error",
          details: err.errors.map((e) => ({
            path: e.path?.join(" "),
            message: e.message,
          })),
        });
        return;
      }
      next(err); // Pass other errors to error-handling middleware
    }
  };
};
