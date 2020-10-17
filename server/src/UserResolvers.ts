import {
  Arg,
  Ctx,
  Query,
  Resolver,
  Mutation,
  ObjectType,
  Field,
  UseMiddleware,
  Int,
} from 'type-graphql';
import { User } from './entity/User';
import { compare, hash } from 'bcryptjs';
import { MyContext } from './MyContext';
import { createAccessToken, createRefreshToken } from './auth';
import { isAuth } from './isAuth';
import { sendRefreshToken } from './sendRefreshToken';
import { getConnection } from 'typeorm';
import { verify } from 'jsonwebtoken';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

// type-graphql 에게 graphql 타입과, typescript 타입을 둘 다 알려준다.
@Resolver()
export class UserResolvers {
  @Query(() => String)
  hello() {
    return 'hi!!!';
  }

  @Query(() => String)
  @UseMiddleware(isAuth) // 미들웨어는 variable 과 Context 를 검사하며 추가적인 작업을 할 수 있는 함수다.
  bye(
    @Ctx() { payload }: MyContext // Context(Ctx) 에 접근해야 isAuth 미들웨어를 통해 주입한 payload 에 접근 가능하다.
  ) {
    return `Your user id is: ${payload!.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  me(
    @Ctx() context:MyContext
  ) {
    const authorization = context.req.headers['authorization'];
    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(' ')[1];
      const payload:any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId)
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async register(
    // @Arg 안은 graphql 쿼리문에서 사용될 변수 이름, 괄호 밖은 typescript 변수명:타입.
    //
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    const hashedPassword = await hash(password, 12);
    try {
      await User.insert({
        email,
        password: hashedPassword,
      });
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  // 사실 보안적으로 이런 방식을 사용해서는 안 된다.
  // 유저의 기존 refreshToken 을 무용지물로 만드는 중인데,
  // 이걸 graphql 쿼리로 노출시키기 보다, 필요에 따라 다른 곳에 추가적인 함수를 만드는 것이 맞다.
  // 이건 제대로 작동하는지 확인하기 위한 테스트용
  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg('userId', () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1);

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    // @Arg 안은 graphql 쿼리문에서 사용될 변수 이름, 괄호 밖은 typescript 변수명:타입.
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('could not find the user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('Not matching password');
    }

    sendRefreshToken(res, createRefreshToken(user));

    // 성공한 경우
    return {
      accessToken: createAccessToken(user),
      user
    };
  }

  @Mutation(() => Boolean)
  async logout(
    @Ctx() {res}: MyContext
  ) {
    sendRefreshToken(res, '');
    return true;
  }
}
