import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddRetroItem from './components/AddRetroItem';
import ListRetroItems from './components/ListRetroItems';
import TeamPicker from './components/TeamPicker';
import NotFound from './components/NotFound';
import firebase from 'firebase';
import './App.css';
import { app, base } from './base';

class App extends Component {
  state = {
    uid: null,
    displayName: null,
    email: null,
    photoURL: null,
    userData: {}
  };

  componentDidMount() {
    app.auth().onAuthStateChanged((user, error) => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
    this.ref = base.bindToState(`users/${this.uid}`, {
      context: this,
      state: 'userData'
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
        uid: authData.user.uid,
        displayName: authData.user.displayName,
        email: authData.user.email,
        photoURL: authData.user.photoURL
      });
    });
  };

  authenticate = provider => {
    app
      .auth()
      .signInWithRedirect(provider)
      .then(authData => {
        this.setState({
          userData: authData
        });
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

  addItem = (teamId, uid, message) => {
    app
      .database()
      .ref(`data/${teamId}`)
      .child(`${uid}`)
      .update({
        [Date.now()]: message
      });
  };

  render() {
    const MyAddRetroItem = props => {
      return (
        <AddRetroItem uid={this.state.uid} addItem={this.addItem} {...props} />
      );
    };

    const MyListRetroItems = props => {
      return <ListRetroItems displayName={this.state.displayName} {...props} />;
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
            <Route
              exact
              path="/team/:teamId/list"
              component={MyListRetroItems}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
