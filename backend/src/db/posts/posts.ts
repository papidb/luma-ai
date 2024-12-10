import { db } from "../connection";
import {
  deletePostTemplate,
  insertPostTemplate,
  selectPostByIdTemplate,
  selectPostsTemplate,
} from "./query-tamplates";
import { Post } from "./types";

export const getPosts = (userId: string): Promise<Post[]> =>
  db.all<Post>(selectPostsTemplate, [userId]);

export const deletePost = (id: string) => db.run(deletePostTemplate, [id]);

export const getPostById = (id: string): Promise<Post> =>
  db.get<Post>(selectPostByIdTemplate, [id]);

export const addPost = (post: Post) => {
  return db.run(insertPostTemplate, [
    post.title,
    post.body,
    post.user_id,
    post.id,
    post.created_at,
  ]);
};
