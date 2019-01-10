import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={HomePage} />
        </Switch>
    </BrowserRouter>
);

export default App;
