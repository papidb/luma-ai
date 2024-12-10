import { api } from "../../config/wrench";
import { ApiResponse } from "../types";
import { Post } from "./types";

const postsApi = api.url("/posts");

export const getPosts = async () => {
  return postsApi.url("/").get().json<ApiResponse<Post[]>>();
};

export const createPost = (
  params: Pick<Post, "title" | "body"> & { user_id: string }
) => {
  return postsApi.url("/").post(params).json<ApiResponse<Post>>();
};

export const deletePost = (id: string) =>
  postsApi.url(`/${id}`).delete().json();
