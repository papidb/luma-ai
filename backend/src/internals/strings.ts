import { randomUUID } from "crypto";

export const generateId = () => randomUUID().replace(/-/g, "");
