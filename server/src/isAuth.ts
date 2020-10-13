import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "./MyContext";

// bearer 102930jaeklaefaw -> 토큰이 이런 형태로 들어올 예정

export const isAuth:MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization'];
  if (!authorization) {
    throw new Error('인증되지 않았습니다.')
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
    context.payload = payload as any;
  } catch (error) {
    console.error(error)
    throw new Error('인증되지 않았습니다.');
  }
  // next() 를 하면 미들웨어가 중간에 가로채서 할 일을 끝냈으니 
  // 본래 Resolver 작업을 진행하라는 뜻이 된다.
  return next(); 
};