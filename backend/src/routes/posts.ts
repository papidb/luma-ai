import { formatISO } from "date-fns";
import { Request, Response, Router } from "express";
import { z } from "zod";
import { addPost, deletePost, getPostById, getPosts } from "../db/posts/posts";
import { Post } from "../db/posts/types";
import { getUserById } from "../db/users/users";
import { generateId } from "../internals/strings";
import { validateRequest } from "../middlewares/validate-request";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get(
  "/",
  validateRequest({
    query: z.object({
      userId: z.string({ message: "userId is Required" }).min(1),
    }),
  }),
  async (req: Request, res: Response) => {
    const userId = String(req.query.userId);
    const posts = await getPosts(userId);
    res
      .status(StatusCodes.OK)
      .send({ data: posts, message: "Posts retrieved successfully" });
  }
);

router.delete(
  "/:id",
  validateRequest({
    params: z.object({
      id: z
        .string({ message: "id is required" })
        .trim()
        .min(1, { message: "id is required" }),
    }),
  }),
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await getPostById(id);
    if (!post) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ data: null, message: "Post not found" });
      return;
    }
    await deletePost(id);
    res
      .status(StatusCodes.OK)
      .send({ message: "Post deleted successfully", data: null });
  }
);

router.post(
  "/",
  validateRequest({
    body: z.object({
      title: z.string().min(1),
      body: z.string().min(1),
      user_id: z.string(),
    }),
  }),
  async (req: Request, res: Response) => {
    const post: Post = req.body;
    const user = await getUserById(post.user_id);
    if (!user) {
      res
        .status(StatusCodes.NOT_FOUND)
        .send({ data: null, message: "User not found" });
      return;
    }
    post.id = generateId();
    post.created_at = formatISO(new Date());
    await addPost(post);
    res
      .status(StatusCodes.CREATED)
      .send({ message: "Post added successfully", data: post });
  }
);

export default router;
