import React, { Component } from 'react';
import { withRouter } from 'react-router';

class TeamPicker extends Component {
  goToTeam = event => {
    event.preventDefault();
    const teamId = this.teamInput.value;
    this.props.history.push(`team/${teamId}`);
  };

  render() {
    return (
      <form className="team-selector" onSubmit={this.goToTeam}>
        <h2>Please Enter a Teamname</h2>
        <input
          type="text"
          required
          placeholder="Team Name"
          defaultValue="vorstand"
          ref={input => {
            this.teamInput = input;
          }}
        />
        <button type="submit">Open team Retrobox</button>
      </form>
    );
  }
}

export default withRouter(TeamPicker);
