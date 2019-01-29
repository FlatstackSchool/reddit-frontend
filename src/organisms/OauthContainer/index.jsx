/* eslint-disable react/prop-types,react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openOauthWindow } from '../../actions/openOauthWindow';
import { generateState } from '../../actions/generateState';
import SignInButton from '../../atoms/SingInButton';

class OauthContainer extends Component {
  handleClick = () => {
    this.props.generateState();
    const state = this.props.randomStringProps;
    this.props.openOauthWindow(state);
    console.log(this.props);
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
  openProps: state.isOpen,
  randomStringProps: state.randomString,
});

const mapDispatchToProps = dispatch => ({
  openOauthWindow: () => {
    dispatch(openOauthWindow());
  },
  generateState: () => {
    dispatch(generateState());
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
