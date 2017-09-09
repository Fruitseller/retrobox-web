import React from 'react';
import * as firebase from 'firebase';
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
      data: {}
    };
  }
  componentDidMount() {
    const db = firebase.database();
    const dbRef = db.ref().child('data');
    dbRef.on('value', snapshot => {
      if (snapshot.val()) {
        this.setState({
          data: snapshot.val()
        });
      }
    });
  }

  render() {
    return (
      <div className={this.props.classes.root}>
        <h1>Sprint thoughts</h1>
        <List>
          {Object.keys(this.state.data).map(key => {
            return (
              <ListItem key={key}>
                <ListItemText primary={this.state.data[key]} />
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(ListRetroItems);
