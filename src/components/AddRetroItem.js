import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import RetroAppBar from './RetroAppBar';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  }
});

class AddRetroItem extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.addItem(
      this.props.match.params.teamId.toLowerCase(),
      this.props.uid,
      this.input.value
    );
    this.form.reset();
  };

  render() {
    return (
      <div>
        <RetroAppBar
          handleOnClick={this.props.handleAuthentication}
          buttonText={this.props.authenticationText}
          teamLink={this.props.match.params.teamId}
        />
        <form
          className="form"
          onSubmit={this.handleSubmit}
          ref={form => (this.form = form)}
        >
          <FormControl className={this.props.classes.formControl}>
            <InputLabel htmlFor="thoughts">Enter your thoughts</InputLabel>
            <Input
              id="thoughts"
              inputRef={input => {
                this.input = input;
              }}
            />
          </FormControl>

          <input type="submit" hidden />
        </form>
      </div>
    );
  }
}

AddRetroItem.propTypes = {
  uid: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired
};

export default withStyles(styles)(withRouter(AddRetroItem));
