import { resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import type User from "../types/user";

const filePath: string = resolve(__dirname, "../data/users.json");

// data/users.json 파일 읽기 함수
export async function readUsers(): Promise<User[]> {
  const usersString = await readFile(filePath, {
    encoding: "utf-8",
  });
  // JSON format string - [JSON.parse(jsonString)] - Javascript Object
  return await JSON.parse(usersString);
}

// data/users.json 파일에 쓰기
export async function writeUsers(newUser: User) {
  const users = await readUsers();
  users.push(newUser);
  await writeFile(filePath, JSON.stringify(users, null, 2), {
    encoding: "utf-8",
  });
}