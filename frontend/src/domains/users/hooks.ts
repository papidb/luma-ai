import { infiniteQueryOptions } from "@tanstack/react-query";
import { getUsers } from "./api";
import { USER_QUERY_KEYS } from "./constants";

export function usersInfiniteQueryOptions() {
  return infiniteQueryOptions({
    queryKey: USER_QUERY_KEYS.users,
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
