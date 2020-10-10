import { Field, Int, ObjectType } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
// Entitiy 가 데이터베이스 테이블이라고 생각하면 된다.
// ormconfig.json 에 entities 의 위치가 정의되어 있다.

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
}
