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
- [] Setup a GraphQL Server using TypeGraphQL and TypeORM
- [] Register a user
- [] Login, and create access && refresh tokens
- [] Authenticated mutations/queries
- [] Refresh the token
- [] Revoke tokens for a user

### Frontend
- [] Setup Apollo and GraphQL Code Generator
- [] React Router
- [] Register/Loign
- [] Persisting session on refresh
- [] Handling expired tokens
- [] Fetching current user in header

### 환경 세팅
1. `npm i -g typeorm`
2. `typeorm init --name server --database postgres` (server 폴더 안에 세팅)
3. `cd server/`
4. `npx tsconfig.json` (좀 더 최신의 제대로 된 tsconfig.json 파일로 교체)
5. `yarn` (yarn 을 사용하여 디펜던시 설치)
6. `yarn upgrade-interactive --latest` (디펜던시 버전 업그레이드)
7. `yarn add express apollo-server-express graphql`
8. `yarn add -D @types/express @types/graphql`