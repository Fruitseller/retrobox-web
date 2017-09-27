import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddRetroItem from './components/AddRetroItem';
import ListRetroItems from './components/ListRetroItems';
import TeamPicker from './components/TeamPicker';
import NotFound from './components/NotFound';
import firebase from 'firebase';
import './App.css';
import { app } from './base';

class App extends Component {
  state = {
    uid: null
  };

  componentDidMount() {
    app.auth().onAuthStateChanged((user, error) => {
      if (user) {
        console.log('user', user.displayName);
        this.authHandler(null, { user });
      }
    });
  }

  authHandler = (err, authData) => {
    if (err) {
      console.error(err);
      return;
    }
    const storeRef = firebase
      .database()
      .ref()
      .child('data');
    storeRef.once('value', snapshot => {
      this.setState({
        uid: authData.user.uid
      });
    });
  };

  authenticate = provider => {
    app
      .auth()
      .signInWithPopup(provider)
      .then(authData => {
        console.log('name', authData.additionalUserInfo.profile.name);
      });
  };

  logout = () => {
    app.auth().signOut();
    this.setState({ uid: null });
  };

  renderLogin = () => {
    return (
      <nav className="login">
        <p>Sign in</p>
        <button
          className="google"
          onClick={() =>
            this.authenticate(new firebase.auth.GoogleAuthProvider())}
        >
          Log in with google
        </button>
      </nav>
    );
  };

  render() {
    const MyAddRetroItem = props => {
      return <AddRetroItem uid={this.state.uid} {...props} />;
    };

    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }

    return (
      <Router>
        <div className="App">
          <button onClick={this.logout}>Log Out!</button>
          <Switch>
            <Route exact path="/" component={TeamPicker} />
            <Route exact path="/team/:teamId" render={MyAddRetroItem} />
            <Route exact path="/team/:teamId/list" component={ListRetroItems} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
