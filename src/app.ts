// --------------------------------------------------------------------------
// TypeScript + Express.js를 활용해 간단한 API 서버 구성
// --------------------------------------------------------------------------
//
// 라우팅은 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 어떻게 응답할지 결정하는 것을 말하며,
// 이는 URI(또는 경로)와 특정 HTTP 요청 메서드(GET, POST, PUT, PATCH, DELETE 등)입니다.
// 각 경로에는 하나 이상의 핸들러 함수가 있을 수 있으며, 이 함수는 경로가 일치할 때 실행됩니다.
//
// 이미지, 스타일, 스크립트 파일과 같은 정적 파일을 제공하려면 기본 제공되는 미들웨어 함수를 사용합니다.
// 여러 정적 에셋 디렉토리를 사용하려면 express.static 미들웨어 함수를 여러 번 호출합니다.
//
// --------------------------------------------------------------------------

import "dotenv/config";
import express from "express";
import type { Express, Request, Response } from "express";
import { resolve } from "node:path";
import User, { RequestUser } from "./types/user";
import { readFile, writeFile } from "node:fs/promises";
import { readUsers, writeUsers } from "./lib/users";

const app: Express = express(); // new Application()과 같은 맥락

const HOSTNAME = "localhost";
const PORT = Number(process.env.PORT) ?? 4000;
const MESSAGE = `http://${HOSTNAME}:${PORT} 웹 서비스 구동`;

// Middleware
// app.use(greetingMessage);
app.use(express.static(resolve(__dirname, "../public")));
app.use(express.json());

// Routing

// '/' handler : handlers/entry.ts

// GET
// app.get("/", entryHandler);

// POST
// app.post("/", (req, res) => {
//   // 사용자의 요청 URL
//   console.log(req.url);

//   // 서버 -> 클라이언트 응답
//   res.status(201 /* CREATED */).send({
//     message: "POST 요청이 홈페이지로부터 주어졌습니다",
//   });
// });

/* Users API ---------------------------------------------------------------- */

// const dummyUser: User = {
//   id: 1,
//   name: "노종국",
//   age: 28,
//   gender: "남성",
// };

// const dummyUserList: User[] = [dummyUser];

// CREATE
// `POST /api/users`
app.post("/api/users", async (req: Request<{}, {}, RequestUser>, res: Response) => {
  // 클라이언트 요청(JSON)
  // console.log(req.body);

  // 서버에서 프로그래밍
  // 1. data/users.json 파일 읽기
  // fsPromises.readFile();
  const users = await readUsers();

  // 새롭게 생성될 사용자(User) 객체
  // const newId = crypto.randomUUID();
  const newId = users.length + 1;

  const newUser = {
    id: newId,
    ...req.body,
  };

  // 2. data/users.json 파일에 쓰기
  // 기존의 Users 배열에 새 User를 추가
  users.push(newUser); // [...] => [JSON.stringify()] =>"[...]"
  // 파일에 쓰기

  // 클라이언트 응답
  try {
    await writeUsers(newUser);

    // Success case
    res.status(201).json(newUser);
  } catch (error) {
    // Failure case
    res.status(404).json({
      message: (error as Error).message,
    });
  }
});

// READ
// `GET /api/users`
app.get("/api/users", async (req, res) => {
  try {
    const users = await readUsers();
    // throw new Error("oops");

    res.status(200).json(users);
  } catch (error: unknown) {
    res.status(500).json({
      message: "알 수 없는 오류가 발생했습니다! 🎃",
    });
  }
  // Response (to Client)
  // res.status(200).json(dummyUserList);
});

// `GET /api/users/:id`
app.get("/api/users/:id", async (req, res) => {
  // request parameters -> /:id
  const { id } = req.params;

  try {
    const users = await readUsers();

    // 요청된 ID 값과 일치하는 사용자가 존재하는지 검토
    const requestedUser = users.find((user) => user.id === Number(id));
    if (requestedUser) {
      // 요청한 사용자 정보가 있을 경우 -> 응답
      res.status(200).json(requestedUser);
    } else {
      // 요청한 사용자 정보가 없을 경우 -> 에러
      res.status(404).json({
        message: `요청한 사용자 정보(${id})가 존재하지 않습니다! ♦`,
      });
    }
  } catch (error: unknown) {
    res.status(500).json({
      message: "알 수 없는 오류가 발생했습니다. 🎃",
    });
  }
});

// UPDATE
// `PUT /api/users/:id`
// `PATCH /api/users/:id`

// DELETE
// `DELETE /api/users/:id`

// LISTENING

app.listen(PORT, HOSTNAME, () => {
  console.log(MESSAGE);
});
