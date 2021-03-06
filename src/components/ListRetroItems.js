import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { app, base } from './../base';
import RetroItem from './RetroItem';
import RetroAppBar from './RetroAppBar';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class ListRetroItems extends React.Component {
  constructor() {
    super();
    this.state = {
      items: {},
      names: {}
    };
  }
  componentDidMount() {
    this.ref = base.bindToState(`data/${this.props.match.params.teamId}`, {
      context: this,
      state: 'items',
      then: () => {
        Object.keys(this.state.items).map(authorId => {
          return Object.keys(this.state.items[authorId]).forEach(() => {
            app
              .database()
              .ref('/users/' + authorId)
              .once('value')
              .then(this.enrichItemsWithDisplayName(authorId));
          });
        });
      }
    });
  }

  enrichItemsWithDisplayName = authorId => {
    return snapshot => {
      this.setState({
        names: {
          [authorId]:
            (snapshot.val() && snapshot.val().displayName) || 'Anonymous'
        }
      });
    };
  };

  removeItem = (teamId, author, timestamp) => {
    const ref = app.database().ref(`data/${teamId}/${author}/${timestamp}`);
    ref.remove();
  };

  render() {
    return (
      <div>
        <RetroAppBar
          handleOnClick={this.props.handleAuthentication}
          buttonText={this.props.authenticationText}
          teamLink={this.props.match.params.teamId}
        />
        <Paper className={this.props.classes.root} elevation={4}>
          <Typography type="headline">Sprint thoughts</Typography>
          <List>
            {Object.keys(this.state.items).map(authorId => {
              return Object.keys(this.state.items[authorId]).map(
                messageTimestamp => {
                  const key = messageTimestamp;
                  const message = this.state.items[authorId][messageTimestamp];
                  const displayName = this.state.names[authorId];
                  return (
                    <RetroItem
                      key={key}
                      teamId={this.props.match.params.teamId}
                      authorId={authorId}
                      authorName={displayName}
                      timestamp={key}
                      message={message}
                      removeItem={this.removeItem}
                    />
                  );
                }
              );
            })}
          </List>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(ListRetroItems);
