import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

const RetroItem = props => {
  const { teamId, authorId, authorName, timestamp, message } = props;
  return (
    <ListItem key={timestamp}>
      <ListItemText primary={message} secondary={authorName} />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Delete"
          onClick={() => props.removeItem(teamId, authorId, timestamp)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default RetroItem;
