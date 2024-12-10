export const POSTS_QUERY_KEYS = {
  posts: (userId: string) => ["posts", userId],
} as const;
