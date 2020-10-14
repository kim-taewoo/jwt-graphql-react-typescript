import React from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const Header = (props: Props) => {
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
    </header>
  );
};

export default Header;
