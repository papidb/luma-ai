import { queryClient } from "@/config/tanstack-query";
import { queryOptions, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPost, deletePost, getPosts } from "./api";
import { POSTS_QUERY_KEYS } from "./constants";

export function postsQueryOptions(userId: string) {
  return queryOptions({
    queryKey: POSTS_QUERY_KEYS.posts(userId),
    queryFn: () => getPosts(userId),
  });
}

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
    onSuccess: (_, variables) => {
      toast.success("Post created successfully");
      return queryClient.invalidateQueries({
        queryKey: POSTS_QUERY_KEYS.posts(variables.user_id),
      });
    },
  });
}

export function useDeletePost(id: string) {
  return useMutation({
    mutationFn: () => deletePost(id),
  });
}
