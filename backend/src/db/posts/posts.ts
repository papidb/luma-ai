import { db } from "../connection";
import {
  deletePostTemplate,
  selectPostByIdTemplate,
  selectPostsTemplate,
} from "./query-tamplates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  db.all<Post>(selectPostsTemplate, [userId]);

export const deletePost = (id: string) => db.run(deletePostTemplate, [id]);

export const getPostById = (id: string): Promise<Post> =>
  db.get<Post>(selectPostByIdTemplate, [id]);
