import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { NextFunction, Request, Response } from "express";

async function entryHandler(req: Request, res: Response, next: NextFunction) {
  // 서버 애플리케이션의 로컬 저장소 위치의 파일 비동기 방식으로 읽기
  // fsPromises.readFile(path,options?)
  // __dirname === new URL('./' , import.meta.url)
  try {
    const entryFilePath = resolve(__dirname, "../index.html");
    const entryFileCode = await readFile(entryFilePath, { encoding: "utf-8" });

    // 서버 -> 클라이언트 응답
    res.status(200).send(entryFileCode);
  } catch (error: unknown) {
    res.status(500 /* Internal Server Error */).send({
      message: (error as Error).message,
    });
  }
}

export default entryHandler;
