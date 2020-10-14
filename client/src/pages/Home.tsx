import React from 'react';
import { useHelloQuery } from '../generated/graphql';

interface Props {}

export const Home = (props: Props) => {
  const { data, loading } = useHelloQuery();
  if (loading || !data) {
    return <div>로딩중입니다...</div>
  }
  return (
    <div>
      <div>Home Page</div>
      <div>{data.hello}</div>
    </div>
  );
};
