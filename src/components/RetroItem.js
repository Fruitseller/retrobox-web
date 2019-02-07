import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

const RetroItem = props => {
  const {
    teamId,
    authorId,
    authorName,
    timestamp,
    message,
    removeItem
  } = props;
  return (
    <div>
      <Divider />
      <ListItem key={timestamp}>
        <ListItemText primary={message} secondary={authorName || 'Anonymous'} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={() => removeItem(teamId, authorId, timestamp)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
};

RetroItem.propTypes = {
  teamId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  authorName: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default RetroItem;
