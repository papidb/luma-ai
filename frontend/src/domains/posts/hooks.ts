import { queryOptions, useMutation } from "@tanstack/react-query";
import { createPost, deletePost, getPosts } from "./api";
import { POSTS_QUERY_KEYS } from "./constants";

export function postsQueryOptions() {
  return queryOptions({
    queryKey: POSTS_QUERY_KEYS.posts,
    queryFn: getPosts,
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
  });
}

export function useDeletePost(id: string) {
  return useMutation({
    mutationFn: () => deletePost(id),
  });
}
