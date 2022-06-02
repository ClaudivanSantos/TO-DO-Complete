import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Edit from './pages/Edit/Edit'
import Feed from './pages/Feed/Feed'
import Lermais from './pages/Lermais/Lermais'
import Post from './pages/Post/Post'
import NotFound from "./components/NotFound"
import Users from './pages/Users/Users'
import Geruser from './pages/Geruser/Geruser'
import Edituser from './pages/Edituser/Edituser'

const Routes = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Feed}/>
        <Route path="/edit/:id" exact component={Edit} />
        <Route path="/lermais/:id" exact component={Lermais} />
        <Route path="/post" exact component={Post} />
        <Route path="/users" exact component={Users} />
        <Route path="/geruser" exact component={Geruser} />
        <Route path="/geruser/:id" exact component={Geruser} />
        <Route path="/edituser/:id" exact component={Edituser} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );

export default Routes;