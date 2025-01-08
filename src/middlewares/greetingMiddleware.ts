import type { Request, Response, NextFunction } from "express";

function greetingMessage(req: Request, res: Response, next: NextFunction) {
  const date = new Date();
  console.log(`HAPPY NEW YEAR!! ${date.getFullYear()}`);

  // 로직 처리 후 routing으로 넘겨줘야함
  next();
}

export default greetingMessage;
