import React from 'react';
import NotFound from './containers/NotFound';
import { Route, Switch } from 'react-router-dom';
import Login from './containers/Login';
import Home from './containers/Home';
import AppliedRoute from './components/AppliedRoute';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
export default ({ childProps }) => (
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps}/>
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps}/>
        <AppliedRoute path="/notes/new" exact component={NewNote} props={childProps}/>
        <Route component={NotFound} />
    </Switch>
);

