import { db } from "../connection";
import { selectPostsTemplate } from "./query-tamplates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  db.all<Post>(selectPostsTemplate, [userId]);
