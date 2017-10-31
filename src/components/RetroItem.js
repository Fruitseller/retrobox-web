import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

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
    <ListItem key={timestamp}>
      <ListItemText primary={message} secondary={authorName} />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete"
          onClick={() => removeItem(teamId, authorId, timestamp)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

RetroItem.propTypes = {
  teamId: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired
};

export default RetroItem;
