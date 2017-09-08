import React from 'react';
import * as firebase from 'firebase';
import '../AddRetroItem.css';

class AddRetroItem extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const db = firebase.database();
    const dbRef = db.ref();
    dbRef.set({
      data: this.refs.input.value
    });
    this.form.reset();
  };

  render() {
    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
        ref={form => (this.form = form)}
      >
        <div className="input">
          <div className="input-container">
            <input
              type="text"
              className="input-field"
              placeholder="Enter your retro thoughts"
              ref="input"
            />
            <div className="input-field-shadow" />
          </div>
        </div>
        <input type="submit" hidden />
      </form>
    );
  }
}

export default AddRetroItem;
