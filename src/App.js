import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './scenes/Home';
import Page404 from './scenes/404';
import PageLogin from './scenes/Auth/scenes/Login';
import PageRegister from './scenes/Auth/scenes/Register';
import Main from './scenes/Main';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends Component {
  render() {
    const {
      authenticated
    } = this.props;

    if (authenticated === false) {
      return (
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/404" component={Page404} />
            <Route exact path="/login" component={PageLogin} />
            <Route exact path="/register" component={PageRegister} />
          </Switch>
          <Footer />
        </div>
      );
    }

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route component={Main} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  authenticated: state.auth.authenticated,
  route: state.route
});

export default connect(mapStateToProps)(App);
