import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  }
});

class AddRetroItem extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    this.props.addItem(
      this.props.match.params.teamId,
      this.props.uid,
      this.input.value
    );
    this.form.reset();
  };

  render() {
    return (
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
    );
  }
}

AddRetroItem.propTypes = {
  uid: PropTypes.string.isRequired,
  addItem: PropTypes.func.isRequired
};

export default withStyles(styles)(withRouter(AddRetroItem));
