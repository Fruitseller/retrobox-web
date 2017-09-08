import React from 'react';
import * as firebase from 'firebase';

class ListRetroItems extends React.Component {
  constructor() {
    super();
    this.state = {
      data: ''
    };
  }
  componentDidMount() {
    const db = firebase.database();
    const dbRef = db.ref().child('data');
    dbRef.on('value', snapshot => {
      this.setState({
        data: snapshot.val()
      });
    });
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}

export default ListRetroItems;
