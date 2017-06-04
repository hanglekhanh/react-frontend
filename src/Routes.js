import React from 'react';
import NotFound from './containers/NotFound';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import Home from './containers/Home';
import AppliedRoute from './components/AppliedRoute';
export default ({ childProps }) => (
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <Route component={NotFound} />
    </Switch>
);

