import React from 'react';
import { useByeQuery } from '../generated/graphql';

interface Props {}

export const Bye = (props: Props) => {
  const { loading, data, error } = useByeQuery({
    fetchPolicy: 'network-only'
  });
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>error 발생</div>;
  }
  if (!data) {
    return <div>no data!</div>;
  }
  return <div>{data.bye}</div>;
};
