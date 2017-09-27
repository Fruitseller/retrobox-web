import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddRetroItem from './components/AddRetroItem';
import ListRetroItems from './components/ListRetroItems';
import firebase from 'firebase';
import './App.css';
import { app, base } from './base';

class App extends Component {
  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    app.auth().onAuthStateChanged((user, error) => {
      if (user) {
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
      const data = snapshot.val() || {};
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  };

  authenticate = provider => {
    app
      .auth()
      .signInWithPopup(provider)
      .then(authData => {
        console.log('authData', authData);
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
          className="github"
          onClick={() =>
            this.authenticate(new firebase.auth.GithubAuthProvider())}
        >
          Log in with github
        </button>
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
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }

    return (
      <Router>
        <div className="App">
          <button onClick={this.logout}>Log Out!</button>
          <Route exact path="/" component={AddRetroItem} />
          <Route path="/list" component={ListRetroItems} />
        </div>
      </Router>
    );
  }
}

export default App;
