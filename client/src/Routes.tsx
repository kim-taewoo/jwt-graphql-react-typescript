import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

interface Props {}

export const Routes: React.FC = (props: Props) => {
  return (
    <BrowserRouter>
      <div>
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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
