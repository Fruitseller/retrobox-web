import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Spinner from 'react-spinkit';
import AddRetroItem from './components/AddRetroItem';
import ListRetroItems from './components/ListRetroItems';
import TeamPicker from './components/TeamPicker';
import NotFound from './components/NotFound';
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
    let handleOnClick = this.login;
    let buttonText = 'Login with google';
    if (this.state.userData.uid) {
      handleOnClick = this.logout;
      buttonText = 'Logout';
    }
    return (
      <div className={this.props.classes.root}>
        <AppBar>
          <Toolbar>
            <Typography
              type="title"
              color="inherit"
              className={this.props.classes.flex}
            >
              Retrobox
            </Typography>
            <Button color="contrast" onClick={handleOnClick}>
              {buttonText}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  };

  renderRoutes = MyAddRetroItem => {
    return (
      <Switch>
        <Route exact path="/" component={TeamPicker} />
        <Route exact path="/team/:teamId" render={MyAddRetroItem} />
        <Route exact path="/team/:teamId/list" component={ListRetroItems} />
        <Route component={NotFound} />
      </Switch>
    );
  };

  render() {
    const MyAddRetroItem = props => {
      return (
        <AddRetroItem
          uid={this.state.userData.uid}
          addItem={this.addItem}
          {...props}
        />
      );
    };

    if (this.state.isLoading) {
      return <Spinner name="pacman" color="goldenrod" />;
    } else {
      return (
        <Router>
          <div className="App">
            {this.renderAppBar()}
            {this.state.userData.uid ? this.renderRoutes(MyAddRetroItem) : null}
          </div>
        </Router>
      );
    }
  }
}

export default withStyles(styles)(App);
