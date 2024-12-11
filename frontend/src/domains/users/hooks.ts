import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { getUsers } from "./api";
import { USER_QUERY_KEYS } from "./constants";

export function usersQueryOptions(page = 0, pageSize = 4) {
  return queryOptions({
    queryKey: USER_QUERY_KEYS.users(page, pageSize),
    queryFn: () => getUsers(page, pageSize),
  });
}

export function usersInfiniteQueryOptions() {
  return infiniteQueryOptions({
    queryKey: USER_QUERY_KEYS.paginated_user,
    queryFn: ({ pageParam }) => getUsers(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page_count === lastPage.page) {
        return undefined;
      }
      return lastPage.page + 1;
    },
  });
}
