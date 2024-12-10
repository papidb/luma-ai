import { api } from "../../config/wrench";
import { ApiResponse } from "../types";
import { Post } from "./types";

const postsApi = api.url("/posts");

export const getPosts = async (userId: string) =>
  (await postsApi.url(`?userId=${userId}`).get().json<ApiResponse<Post[]>>())
    .data;

export const createPost = (
  params: Pick<Post, "title" | "body"> & { user_id: string }
) => {
  return postsApi.url("/").post(params).json<ApiResponse<Post>>();
};

export const deletePost = (id: string) =>
  postsApi.url(`/${id}`).delete().json();
