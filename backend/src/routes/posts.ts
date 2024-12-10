import { Request, Response, Router } from "express";
import { deletePost, getPostById, getPosts } from "../db/posts/posts";

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

export default router;
