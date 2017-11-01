import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import { app, base } from './../base';
import RetroItem from './RetroItem';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper
  }
});

class ListRetroItems extends React.Component {
  constructor() {
    super();
    this.state = {
      items: {}
    };
  }
  componentDidMount() {
    this.ref = base.bindToState(`data/${this.props.match.params.teamId}`, {
      context: this,
      state: 'items',
      then: () => {
        Object.keys(this.state.items).map(authorId => {
          return Object.keys(
            this.state.items[authorId]
          ).map(messageTimestamp => {
            return app
              .database()
              .ref('/users/' + authorId)
              .once('value')
              .then(snapshot => {
                this.setState({
                  items: {
                    ...this.state.items,
                    [authorId]: {
                      ...this.state.items[authorId],
                      displayName:
                        (snapshot.val() && snapshot.val().displayName) ||
                        'Anonymous'
                    }
                  }
                });
              });
          });
        });
      }
    });
  }

  removeItem = (teamId, author, timestamp) => {
    const ref = app.database().ref(`data/${teamId}/${author}/${timestamp}`);
    ref.remove();
  };

  render() {
    return (
      <div className={this.props.classes.root}>
        <h1>Sprint thoughts</h1>
        <List>
          {Object.keys(this.state.items).map(authorId => {
            return Object.keys(
              this.state.items[authorId]
            ).map(messageTimestamp => {
              if (messageTimestamp !== 'displayName') {
                const key = messageTimestamp;
                const message = this.state.items[authorId][messageTimestamp];
                const displayName = this.state.items[authorId].displayName;
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
              } else {
                return null;
              }
            });
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(ListRetroItems);
