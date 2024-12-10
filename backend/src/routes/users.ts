import { Router, Request, Response } from "express";

import { getUsers, getUsersCount } from "../db/users/users";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
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
});

router.get("/count", async (req: Request, res: Response) => {
  const count = await getUsersCount();
  res.send({ data: count, message: "Users count retrieved successfully" });
});

export default router;
