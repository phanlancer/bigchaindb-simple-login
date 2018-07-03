import React, { Component } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { registerAction } from '../../services/actions/auth';
import FormCard from '../Auth/components/FormCard';


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.auth.me,
      showWarn: false
    };
  }

  checkValidation() {
    return this.state.email !== '' && this.state.address !== '' && this.state.DOB !== '' && this.state.name !== '';
  }

  // handle events
  handleEmailChanged(e) {
    this.setState({ email: e.target.value });
  }

  handleNameChanged(e) {
    this.setState({ name: e.target.value });
  }

  handleAddressChanged(e) {
    this.setState({ address: e.target.value });
  }

  handleDOBChanged(e) {
    this.setState({ DOB: e.target.value });
  }

  handleSubmit() {
    if (this.checkValidation() === false) {
      this.setState({ showWarn: true });
      return;
    }
    this.setState({ showWarn: false });

    const payload = {
      name: this.state.name,
      address: this.state.address,
      DOB: this.state.DOB,
      email: this.state.email,
      password: this.state.password
    };
    this.props.actions.registerAction(payload);
  }

  render() {
    return (
      <FormCard title="Profile">
        {
          this.state.showWarn && this.checkValidation() === false &&
          (<Label>All Fields are required</Label>)
        }

        {
          this.props.app.error &&
          (<Label>{this.props.app.errorMessage}</Label>)
        }

        <FormGroup>
          <Input
            id="profileFormEmail"
            className="form__input mb-4"
            type="email"
            placeholder="Email"
            autoFocus={true}
            value={this.state.email}
            onChange={this.handleEmailChanged.bind(this)}
          />
        </FormGroup>

        <FormGroup>
          <Input
            id="profileFormName"
            className="form__input mb-4"
            type="text"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleNameChanged.bind(this)}
          />
        </FormGroup>

        <FormGroup>
          <Input
            id="profileFormAddress"
            className="form__input mb-4"
            type="text"
            placeholder="Address"
            value={this.state.address}
            onChange={this.handleAddressChanged.bind(this)}
          />
        </FormGroup>

        <FormGroup>
          <Input
            id="profileFormAddress"
            className="form__input mb-4"
            type="date"
            placeholder="Date of Birthday"
            value={this.state.DOB}
            onChange={this.handleDOBChanged.bind(this)}
          />
        </FormGroup>

        <button className="form__btn mb-5 mt-3" type="button" onClick={this.handleSubmit.bind(this)}>UPDATE</button>

        <br/>
      </FormCard>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    registerAction
  };

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
