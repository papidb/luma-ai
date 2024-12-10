export const USER_QUERY_KEYS = {
  users: (page: number) => ["users", page],
  paginated_user: ["paginated_user"],
} as const;
