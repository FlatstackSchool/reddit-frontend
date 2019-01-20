import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage/index';
import CommentsPage from './pages/CommentsPage/index';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={HomePage} exact />
      <Route path="/comments/:id" component={CommentsPage} exact />
    </Switch>
  </BrowserRouter>
);

export default App;
