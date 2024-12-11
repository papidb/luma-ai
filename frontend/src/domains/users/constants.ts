export const USER_QUERY_KEYS = {
  users: (page: number, pageSize: number) => ["users", page, pageSize],
  paginated_user: ["paginated_user"],
} as const;
