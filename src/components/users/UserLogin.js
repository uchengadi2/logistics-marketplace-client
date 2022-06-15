import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import LoginForm from "../authForms/LoginForm";
import { signIn } from "./../../actions";

class UserLogin extends React.Component {
  onSubmit = (formValues) => {
    this.props.signIn(formValues);

    this.props.setToken(this.props.token);
  };
  render() {
    return (
      <div>
        <LoginForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

UserLogin.propTypes = {
  setToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  
  return { token: state.auth.token };
};

export default connect(mapStateToProps, { signIn })(UserLogin);
