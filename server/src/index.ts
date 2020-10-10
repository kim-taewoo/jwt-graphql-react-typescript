import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolvers } from './UserResolvers';
import { createConnection } from 'typeorm';

(async () => {
  const app = express();
  app.get('/', (_req, res) => res.send('hello'));

  await createConnection();

  const apolloServer = new ApolloServer({
      schema: await buildSchema({
          resolvers: [UserResolvers]
      })
  });
  // graphql 을 express 서버에 주입
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('express server running');
  });
})();