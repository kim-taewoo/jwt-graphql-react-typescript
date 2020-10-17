# JWT + Graphql + React + Typescript

[참고 튜토리얼](https://youtu.be/25GS0MLT8JU)

## 사용 기술
- Typescript
- GraphQL
- TypeGraphQL
- TypeORM
- PostgresSQL
- React
- Apollo

## TODO
### Backend
- [x] Setup a GraphQL Server using TypeGraphQL and TypeORM
- [x] Register a user
- [x] Login, and create access && refresh tokens
- [x] Authenticated mutations/queries
- [x] Refresh the token
- [x] Revoke tokens for a user

### Frontend
- [x] Setup Apollo and GraphQL Code Generator
- [x] React Router
- [x] Register/Loign
- [x] Persisting session on refresh
- [x] Handling expired tokens
- [x] Fetching current user in header

### 환경 세팅
#### server
1. `npm i -g typeorm`
2. `typeorm init --name server --database postgres` (server 폴더 안에 세팅)
3. `cd server/`
4. `npx tsconfig.json` (좀 더 최신의 제대로 된 tsconfig.json 파일로 교체)
5. `yarn` (yarn 을 사용하여 디펜던시 설치)
6. `yarn upgrade-interactive --latest` (디펜던시 버전 업그레이드)
7. `yarn add express apollo-server-express graphql`
8. `yarn add -D @types/express @types/graphql`
9. `yarn add type-graphql`

#### client
1. `npx create-react-app client --template typescript`
2. `cd client`
3. `yarn add @apollo/client graphql`
4. `yarn add -D @types/graphql`
5. `yarn add -D @graphql-codegen/cli`
6. `npx graphql-codegen init` (graphql 제너레이터 설정 시작)
7. `yarn gen`

### Notes

#### Backend
- 타입스크립트와 함께 쓰려면 `type-graphql` 을 쓰는 게 인생을 편하게 해준다.
- TypeORM 타입을 Type-GraphQL 타입으로 사용할 수 있다. `@ObjectType()` 과 `Field()` 를 이용해서 graphQL 에 노출하고 싶은 필드를 설정한다.
- Refresh Token 을 발급하려면 서버 요청마다 토큰을 검증할 수 있어야 하는데, 그걸 위해 Apollo Server 생성자에 **Context** 를 설정해줘야 한다. [참고블로그](https://www.daleseo.com/graphql-apollo-server-auth/)

#### Frontend
- Apollo Client 의 HttpLink 를 커스텀해서 쓸 경우에는, **모든** HttpLink 인스턴스에 `credentials: 'include'` 를 해주어야만 `set-cookie` 헤더를 받았을 때 제대로 쿠키를 세팅할 수 있다.
- 어떤 graphql 쿼리문으로 인해 다른 쿼리문이 가질 값이 업데이트 된다면(로그인을 하면 현재 유저가 업데이트 되어야 겠지?), ApolloCache 를 업데이트 해주어야 한다. 이 때, 당연히 업데이트 하는 `data` 값은 변화시키려고 하는 대상의 properties 와 일치해야 한다.
     ```tsx
    update: (store, {data}) => {
      if (!data) {
        return null;
      }
      // Apollo Cache 업데이트
      store.writeQuery({
        query: MeDocument,
        data: data.login.user
      })
    }
    ```