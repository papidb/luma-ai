import config from "config";
import sqlite3, { RunResult } from "sqlite3";

const dbPath = config.get("dbPath") as string;
export const connection = new sqlite3.Database(dbPath);

class Database {
  connection: sqlite3.Database;
  constructor(connection: sqlite3.Database) {
    this.connection = connection;
  }
  get<T>(sql: string): Promise<T>;
  get<T>(sql: string, params: any): Promise<T>;
  get<T>(sql: string, ...params: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      this.connection.get<T>(
        sql,
        ...params,
        (error: Error | null, result: T) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  }

  all<T>(sql: string): Promise<T[]>;
  all<T>(sql: string, params: any): Promise<T[]>;
  all<T>(sql: string, ...params: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      connection.all<T>(sql, ...params, (error: Error | null, results: T[]) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }

  run(sql: string): Promise<RunResult>;
  run(sql: string, params: any): Promise<RunResult>;
  run(sql: string, ...params: any[]): Promise<RunResult> {
    return new Promise((resolve, reject) => {
      this.connection.run(
        sql,
        ...params,
        (result: RunResult, error: Error | null) => {
          if (error) {
            reject(error);
          }
          resolve(result);
        }
      );
    });
  }
}

export const db = new Database(connection);
