import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';

const RetroItem = props => {
  return (
    <ListItem key={props.key}>
      {/*TODO add Author as alt text*/}
      <ListItemText primary={props.message} />
    </ListItem>
  );
};

export default RetroItem;
