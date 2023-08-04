import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { NavbarComponent } from './components';
import { Home, Sukses } from './pages';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sukses" exact component={Sukses} />
          </Switch>
        </main>
      </BrowserRouter>
    );
  }
}