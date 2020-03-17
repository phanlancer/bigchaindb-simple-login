import React, { Component } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loginAction } from "../../../../services/actions/auth";
import FormCard from "../../components/FormCard";
import CircularProgress from "../../../../components/CircularProgress";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      password: "",
      showWarn: false
    };
  }

  checkValidation() {
    return this.state.password !== "";
  }

  // handle events
  handlePasswordChanged(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit() {
    if (this.checkValidation() === false) {
      this.setState({ showWarn: true });
      return;
    }
    this.setState({ showWarn: false });

    const payload = {
      password: this.state.password
    };
    this.props.actions.loginAction(payload);
  }

  render() {
    return (
      <FormCard title="Log In">
        {this.state.showWarn && this.checkValidation() === false && (
          <Label>Please input your password</Label>
        )}

        {this.props.app.error && <Label>{this.props.app.errorMessage}</Label>}

        <FormGroup>
          <Input
            id="loginFormPassword"
            className="form__input mb-4"
            type="password"
            placeholder="Password"
            autoFocus={true}
            value={this.state.password}
            onChange={this.handlePasswordChanged.bind(this)}
          />
        </FormGroup>

        {this.props.app.loading ? (
          <CircularProgress />
        ) : (
          <button
            className="form__btn mb-5 mt-3"
            type="button"
            onClick={this.handleSubmit.bind(this)}
          >
            LOG IN
          </button>
        )}

        <br />
        <NavLink to="/register">REGISTER</NavLink>
      </FormCard>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    loginAction
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
