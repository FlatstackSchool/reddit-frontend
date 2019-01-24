import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import HomePage from './pages/HomePage/index';
import CommentsPage from './pages/CommentsPage/index';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/comments/:id" component={CommentsPage} exact />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
