import { formatISO } from "date-fns";
import { Request, Response, Router } from "express";
import { z } from "zod";
import { addPost, deletePost, getPostById, getPosts } from "../db/posts/posts";
import { Post } from "../db/posts/types";
import { getUserById } from "../db/users/users";
import { generateId } from "../internals/strings";
import { validateRequest } from "../middlewares/validate-request";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const userId = req.query.userId?.toString();
  if (!userId) {
    res.status(400).send({ data: null, message: "userId is required" });
    return;
  }
  const posts = await getPosts(userId);
  res.send({ data: posts, message: "Posts retrieved successfully" });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) {
    res.status(400).send({ data: null, message: "id is required" });
    return;
  }
  const post = await getPostById(id);
  if (!post) {
    res.status(404).send({ data: null, message: "Post not found" });
    return;
  }
  await deletePost(id);
  res.send({ message: "Post deleted successfully", data: null });
});

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
      res.status(400).send({ data: null, message: "User not found" });
      return;
    }
    post.id = generateId();
    post.created_at = formatISO(new Date());
    await addPost(post);
    res.send({ message: "Post added successfully", data: post });
  }
);

export default router;
