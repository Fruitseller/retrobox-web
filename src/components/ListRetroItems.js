import React from 'react';
import * as firebase from 'firebase';

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
      <div>
        <h1>Sprint thoughts</h1>
        <ul>
          {Object.keys(this.state.data).map(key => {
            return <li key={key}>{this.state.data[key]}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default ListRetroItems;
