import React from 'react';
import { base } from './../base';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';

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
              return (
                <ListItem key={messageTimestamp}>
                  {/*TODO add Author as alt text*/}
                  <ListItemText
                    primary={this.state.items[author][messageTimestamp]}
                  />
                </ListItem>
              );
            });
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(ListRetroItems);
