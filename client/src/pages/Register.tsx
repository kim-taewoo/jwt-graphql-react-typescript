import React, { useState } from 'react';

interface Props {}

export const Register = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form onSubmit={e => {
      e.preventDefault();
      console.log('form submitted')
      console.log(email, password)
    }}>
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
      <button type="submit">Register</button>
    </form>
  );
};
