import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { setAccessToken } from '../accessToken';
import { useLoginMutation} from '../generated/graphql';

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useLoginMutation();
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await login({
          variables: {
            email,
            password,
          },
        });
        if (response && response.data) {
          setAccessToken(response.data.login.accessToken)
        }
        history.push('/');
      }}
    >
      <div>
        <input
          type='email'
          name=''
          id='emailInput'
          value={email}
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          name=''
          id='passwordInput'
          value={password}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
};
