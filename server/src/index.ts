import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolvers } from './UserResolvers';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { verify } from 'jsonwebtoken';
import cors from 'cors';
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './auth';
import { sendRefreshToken } from './sendRefreshToken';

dotenv.config({ path: path.join(__dirname, './.env') });

(async () => {
  const app = express();
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.use('/refresh_token', cookieParser());
  // app.use(cookieParser());
  app.get('/', (_req, res) => res.send('hello'));

  // 리프레시 토큰을 체크하는 라우트를 분리함으로써 보안성을 높일 수 있다.
  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (error) {
      console.error(error);
      return res.send({ ok: false, accessToken: '' });
    }

    // 여기까지 왔다면 token 이 valid 하다는 것을 알 수 있다.
    // 따라서 새로운 엑세스 토큰을 발급한다.
    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolvers],
    }),
    context: ({ req, res }) => ({ req, res }), // graphql 에
  });
  // graphql 을 express 서버에 주입
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log('express server running');
  });
})();
