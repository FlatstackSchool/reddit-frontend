import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SignIcon from '@material-ui/icons/AccountBox';

const SignInButton = ({ onclick }) => (
  <ListItem button onClick={onclick}>
    <ListItemIcon>
      <SignIcon />
    </ListItemIcon>
    <ListItemText primary="Sign In" />
  </ListItem>
);

SignInButton.propTypes = {
  onclick: PropTypes.func,
};

SignInButton.defaultProps = {
  onclick: undefined,
};
export default SignInButton;
