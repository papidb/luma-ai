import {
  queryOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: (_, variables) => {
      toast.success("Post created successfully");
      return queryClient.refetchQueries(postsQueryOptions(variables.user_id));
    },
  });
}

export function useDeletePost(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success("Post deleted successfully");
      return queryClient.refetchQueries(postsQueryOptions(userId));
    },
  });
}
