/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openOauthWindow } from '../../actions/openOauthWindow';
import { closeOauthWindow } from '../../actions/closeOauthWindow';
import SignInButton from '../../atoms/SingInButton';

class OauthWindow extends Component {
  handleClick = () => {
    this.props.openOauthWindow();
  };

  render() {
    return (
      <div>
        <SignInButton onclick={this.handleClick} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  open: state.open,
});

const mapDispatchToProps = dispatch => ({
  openOauthWindow: () => {
    dispatch(openOauthWindow());
  },
  closeOauthWindow: () => {
    dispatch(closeOauthWindow());
  },
});

OauthWindow.propTypes = {
  openOauthWindow: PropTypes.func,
};

OauthWindow.defaultProps = {
  openOauthWindow: undefined,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OauthWindow);
