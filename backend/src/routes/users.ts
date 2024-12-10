import { Router, Request, Response } from "express";

import { getUsers, getUsersCount } from "../db/users/users";
import { validateRequest } from "../middlewares/validate-request";
import { z } from "zod";

const router = Router();

router.get(
  "/",
  validateRequest({
    query: z.object({
      pageNumber: z.coerce.number().min(0).max(1000).optional(),
      pageSize: z.coerce.number().min(1).max(1000).optional(),
    }),
  }),
  async (req: Request, res: Response) => {
    const pageNumber = Number(req.query.pageNumber) || 0;
    const pageSize = Number(req.query.pageSize) || 4;
    if (pageNumber < 0 || pageSize < 1) {
      res
        .status(400)
        .send({ message: "Invalid page number or page size", data: null });
      return;
    }

    const users = await getUsers(pageNumber, pageSize);
    res.send({ data: users, message: "Users retrieved successfully" });
  }
);

router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ data: count, message: "Users count retrieved successfully" });
});

export default router;
