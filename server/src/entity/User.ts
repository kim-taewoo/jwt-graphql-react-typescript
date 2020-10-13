import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
// Entitiy 가 데이터베이스 테이블이라고 생각하면 된다.
// ormconfig.json 에 entities 의 위치가 정의되어 있다.
// TypeORM 타입을 Type-GraphQL 타입으로 사용할 수 있다. `@ObjectType()` 과 `Field()` 를 이용해서 graphQL 에 노출하고 싶은 필드를 설정한다.
// 이름을 'users' 로 짓는다.
@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text')
  email: string;

  @Column('text')
  password: string;

  @Column('int', {default: 0})
  tokenVersion: number;
}
