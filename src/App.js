import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Spinner from 'react-spinkit';
import AddRetroItem from './components/AddRetroItem';
import ListRetroItems from './components/ListRetroItems';
import TeamPicker from './components/TeamPicker';
import NotFound from './components/NotFound';
import RetroAppBar from './components/RetroAppBar';
import firebase from 'firebase';
import './App.css';
import { app } from './base';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%'
  },
  flex: {
    flex: 1
  }
});

class App extends Component {
  state = {
    userData: {},
    isLoading: false
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
      this.setState(
        {
          userData: {
            uid: authData.user.uid,
            displayName: authData.user.displayName,
            email: authData.user.email,
            photoURL: authData.user.photoURL
          },
          isLoading: false
        },
        () => {
          app
            .database()
            .ref(`users/${this.state.userData.uid}`)
            .update(this.state.userData);
        }
      );
    });
  };

  authenticate = provider => {
    app
      .auth()
      .signInWithPopup(provider)
      .then(authData => {
        this.setState({
          userData: authData,
          isLoading: true
        });
      });
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

  login = () => {
    this.setState({ isLoading: true });
    return this.authenticate(new firebase.auth.GoogleAuthProvider());
  };

  logout = () => {
    app.auth().signOut();
    this.setState({ userData: { uid: null }, isLoading: false });
  };

  renderAppBar = () => {
    return (
      <RetroAppBar handleOnClick={this.login} buttonText="Login with google" />
    );
  };

  renderRoutes = () => {
    let handleAuthentication = this.login;
    let authenticationText = 'Login with google';
    if (this.state.userData.uid) {
      handleAuthentication = this.logout;
      authenticationText = 'Logout';
    }

    const MyTeamPicker = props => {
      return (
        <TeamPicker
          handleAuthentication={handleAuthentication}
          authenticationText={authenticationText}
          {...props}
        />
      );
    };

    const MyAddRetroItem = props => {
      return (
        <AddRetroItem
          handleAuthentication={handleAuthentication}
          authenticationText={authenticationText}
          uid={this.state.userData.uid}
          addItem={this.addItem}
          {...props}
        />
      );
    };

    const MyListRetroItems = props => {
      return (
        <ListRetroItems
          handleAuthentication={handleAuthentication}
          authenticationText={authenticationText}
          {...props}
        />
      );
    };

    return (
      <Switch>
        <Route exact path="/" component={MyTeamPicker} />
        <Route exact path="/team/:teamId" component={MyAddRetroItem} />
        <Route exact path="/team/:teamId/list" component={MyListRetroItems} />
        <Route component={NotFound} />
      </Switch>
    );
  };

  render() {
    if (this.state.isLoading) {
      return <Spinner name="pacman" color="goldenrod" />;
    } else {
      return (
        <Router>
          <div className="App">
            {this.state.userData.uid
              ? this.renderRoutes()
              : this.renderAppBar()}
          </div>
        </Router>
      );
    }
  }
}

export default withStyles(styles)(App);
