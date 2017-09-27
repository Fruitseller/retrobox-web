import React from 'react';
import { withRouter } from 'react-router';
import { base } from './../base';
import '../AddRetroItem.css';

class AddRetroItem extends React.Component {
  constructor() {
    super();
    this.state = {
      items: {}
    };
  }

  componentDidMount() {
    this.ref = base.syncState(this.props.match.params.teamId, {
      context: this,
      state: 'items'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      items: {
        [this.props.uid]: {
          [Date.now()]: this.refs.input.value
        }
      }
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

export default withRouter(AddRetroItem);
