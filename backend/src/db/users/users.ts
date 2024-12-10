import { db } from "../connection";

import {
  selectCountOfUsersTemplate,
  selectUsersTemplate,
} from "./query-templates";
import { User } from "./types";

export const getUsersCount = (): Promise<number> =>
  db
    .get<{ count: number }>(selectCountOfUsersTemplate)
    .then((result) => result.count);

export const getUsers = (
  pageNumber: number,
  pageSize: number
): Promise<User[]> =>
  db.all<User>(selectUsersTemplate, [pageNumber * pageSize, pageSize]);
