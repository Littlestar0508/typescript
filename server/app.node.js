// Node.js JavaScript Runtime

// require는 CommonJS 진영 모듈 호출 방식
// const http = require("node:http");

// ESM 표준 모듈 호출 방식(package.json -> type:'module' / .mjs)
import http from "node:http";

// http://localhost:4000
const HOSTNAME = "localhost";
const PORT = 4000;

// 요청과 응답을 매개변수로 받는다
const server = http.createServer((request, response) => {
  console.log(request.url);
  console.log(request.query);

  response.end(/* html */ `
      <!doctype html>
      <html lang="ko-KR">
        <head>
          <meta charset="utf-8"/>
          <title>TypeScript 에센셜</title>
        </head>
        <body>
          <h1>타입스크립트 에센셜(essentials)</h1>
        </body>
      </html>
    `);
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`서버 구동 http://${HOSTNAME}:${PORT}`);
});
