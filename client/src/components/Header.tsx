import React from 'react';
import { Link } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';

interface Props {}

const Header = (props: Props) => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>Logged in User: {data.me.email}</div>;
  } else {
    body = <div>Not logged in</div>;
  }

  return (
    <header>
      <div>
        <Link to='/'>HOME</Link>
      </div>
      <div>
        <Link to='/register'>REGISTER</Link>
      </div>
      <div>
        <Link to='/login'>LOGIN</Link>
      </div>
      <div>
        <Link to='/bye'>BYE</Link>
      </div>
      {!loading && data && data.me && (
        <div>
          <button
            onClick={async () => {
              await logout();
              setAccessToken('');
              await client!.resetStore();
            }}
          >
            logout
          </button>
        </div>
      )}
      {body}
    </header>
  );
};

export default Header;
