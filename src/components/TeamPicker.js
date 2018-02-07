import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import RetroAppBar from './RetroAppBar';

const styles = theme => ({
  input: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  }
});

class TeamPicker extends Component {
  goToTeam = event => {
    event.preventDefault();
    const teamId = this.teamInput.value.toLowerCase();
    this.props.history.push(`team/${teamId}`);
  };

  render() {
    const { classes, handleAuthentication, authenticationText } = this.props;
    return (
      <div>
        <RetroAppBar
          handleOnClick={handleAuthentication}
          buttonText={authenticationText}
        />
        <form className="team-selector" onSubmit={this.goToTeam}>
          <Typography type="headline" component="h2">
            Please Enter a Teamname
          </Typography>

          <Input
            placeholder="Team Name"
            className={classes.input}
            required
            inputProps={{
              'aria-label': 'Description'
            }}
            inputRef={input => {
              this.teamInput = input;
            }}
          />
          <Button raised type="submit" className={classes.button}>
            Open team Retrobox
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(TeamPicker));
