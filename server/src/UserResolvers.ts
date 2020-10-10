import {
  Arg,
  Ctx,
  Query,
  Resolver,
  Mutation,
  ObjectType,
  Field,
} from 'type-graphql';
import { User } from './entity/User';
import { compare, hash } from 'bcryptjs';
import { MyContext } from './MyContext';
import { createAccessToken, createRefreshToken } from './auth';

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

// type-graphql 에게 graphql 타입과, typescript 타입을 둘 다 알려준다.
@Resolver()
export class UserResolvers {
  @Query(() => String)
  hello() {
    return 'hi!!!';
  }

  @Query(() => [User])
  users() {
    return User.find();
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

  @Mutation(() => LoginResponse)
  async login(
    // @Arg 안은 graphql 쿼리문에서 사용될 변수 이름, 괄호 밖은 typescript 변수명:타입.
    //
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

    res.cookie(
      'jid',
      createRefreshToken(user),
      {
        httpOnly: true
      }
    );

    // 성공한 경우
    return {
      accessToken: createAccessToken(user),
    };
  }
}
