import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
  const buildTitleLink = team => {
    return (
      <Button component={Link} to={team ? `/team/${team}` : '/'}>
        Retrobox
      </Button>
    );
  };

  const buildTeamLink = teamLink => {
    if (teamLink) {
      return (
        <Button component={Link} to={`/team/${teamLink}/list`}>
          {`List ${teamLink} items`}
        </Button>
      );
    }
    return null;
  };

  return (
    <div className={props.classes.root}>
      <AppBar>
        <Toolbar>
          <Typography
            type="title"
            color="inherit"
            align="center"
            className={props.classes.flex}
          >
            {buildTitleLink(props.teamLink)}
          </Typography>
          {buildTeamLink(props.teamLink)}
          <Button onClick={props.handleOnClick}>{props.buttonText}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

RetroAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func.isRequired,
  teamLink: PropTypes.string
};

RetroAppBar.defaultProps = {
  teamLink: null
};

export default withStyles(styles)(withRouter(RetroAppBar));
