import { api } from "../../config/wrench";
import { ApiPaginatedResponse } from "../types";
import { User } from "./types";

const usersApi = api.url("/users");

export const getUsers = async (pageNumber: number, pageSize = 4) => {
  return usersApi
    .url(`/?pageNumber=${pageNumber}&pageSize=${pageSize}`)
    .get()
    .json<ApiPaginatedResponse<User[]>>();
};
