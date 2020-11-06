/* eslint-disable */
import React, { Component } from 'react';
import { Home, RegisterPage, LoginPage, StudyPage, SearchPage, SetsPage, SetPage, SetDetailPage, CardTestPage } from './pages';
// import Auth from "./hoc/auth";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MyNavbar } from './components';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import PrivateRoute from './PrivateRoute';
import axios from 'axios';

axios.interceptors.request.use(function (config) {
  if (localStorage.getItem('Authorization') == undefined) return config;
  config.headers.Authorization = localStorage.getItem('Authorization');
  return config;
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />

          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/search" component={SearchPage} />
          <PrivateRoute path="/sets" component={SetsPage} />
          <PrivateRoute path="/set-create" component={SetPage} />
          <PrivateRoute path="/set-detail" component={SetDetailPage} />
          <PrivateRoute path="/study" component={StudyPage} />
          <PrivateRoute path="/card-test" component={CardTestPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
