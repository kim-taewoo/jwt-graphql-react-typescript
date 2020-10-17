import React, { useEffect, useState } from 'react';
import { setAccessToken } from './accessToken';
import { Routes } from './Routes';

interface Props {}

export const App = (props: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    })
      .then(async (x) => {
        const { accessToken } = await x.json();
        if (!accessToken) {
          // throw new Error('인증되지 않았습니다.');
          console.error('accessToken 이 유효하지 않습니다.')
        }
        setAccessToken(accessToken);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Routes />;
};
