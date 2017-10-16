import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import { base } from './../base';
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
    this.ref = base.bindToState(this.props.match.params.teamId, {
      context: this,
      state: 'items'
    });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <h1>Sprint thoughts</h1>
        <List>
          {Object.keys(this.state.items).map(author => {
            return Object.keys(
              this.state.items[author]
            ).map(messageTimestamp => {
              const key = messageTimestamp;
              const message = this.state.items[author][messageTimestamp];
              return <RetroItem key={key} timestamp={key} message={message} />;
            });
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(ListRetroItems);
