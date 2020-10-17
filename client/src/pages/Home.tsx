import React from 'react';
import { useUsersQuery } from '../generated/graphql';

interface Props {}

export const Home = (props: Props) => {
  const { data } = useUsersQuery({ fetchPolicy: 'network-only' }); // 캐시를 쓰지 않고 언제나 새로 요청 하겠다는 뜻으로 `network-only` 옵션을 사용한다.
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>Users:</div>
      <ul>
        {data.users.map((user) => {
          return (
            <li key={user.id}>
              {user.email}, {user.id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
