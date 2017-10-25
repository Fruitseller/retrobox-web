import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

const RetroItem = props => {
  const { teamId, authorId, timestamp, message } = props;
  return (
    <ListItem key={timestamp}>
      {/*TODO add Author as alt text*/}
      <ListItemText primary={message} />
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
