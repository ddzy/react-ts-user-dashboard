import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// Chrome的redux调试工具
import { composeWithDevTools } from 'redux-devtools-extension'


import reducer from './reducer';

import LoginForm from './pages/login/Login';
import Register from './pages/register/Register';
import User from './pages/user/User';
import NotFound from './components/404/NotFound';



const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
));



ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={LoginForm} />
        <Route path="/login" component ={LoginForm} />
        <Route path="/register" component={Register} />
        <Route path="/user" component={User} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app') as HTMLDivElement
);