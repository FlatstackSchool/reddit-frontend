/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openOauthWindow } from '../../store/actions/openOauthWindow';
import SignInButton from '../../atoms/SingInButton';

class OauthContainer extends Component {
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
  isOpen: state.isOpen,
});

const mapDispatchToProps = dispatch => ({
  openOauthWindow: () => {
    dispatch(openOauthWindow());
  },
});

OauthContainer.propTypes = {
  openOauthWindow: PropTypes.func,
};

OauthContainer.defaultProps = {
  openOauthWindow: undefined,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OauthContainer);
