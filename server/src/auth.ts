import dotenv from 'dotenv'
import path from 'path'
import { sign } from 'jsonwebtoken';
import { User } from './entity/User';

dotenv.config({ path: path.join(__dirname, './.env') });

// SECRET_KEY 에 ! 를 붙여주는 이유는, 타입스크립트가 `undefined` 일 수 있다고 경고하기 때문이다.
// 확실히 undefined 가 아님을 안다고 느낌표로 표시해주면서 진정시켜 주자.
export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '20m' });
};

export const createRefreshToken = (user: User) => {
  return sign({ userId: user.id, tokenVersion: user.tokenVersion}, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: '7d',
  });
};

