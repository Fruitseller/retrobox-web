import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%'
  },
  flex: {
    flex: 1
  }
});

const RetroAppBar = props => {
  return (
    <div className={props.classes.root}>
      <AppBar>
        <Toolbar>
          <Typography
            type="title"
            color="inherit"
            className={props.classes.flex}
          >
            Retrobox
          </Typography>
          <Button color="contrast" onClick={props.handleOnClick}>
            {props.buttonText}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

RetroAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired
};

export default withStyles(styles)(RetroAppBar);
