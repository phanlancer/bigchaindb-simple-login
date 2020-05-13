import React, { Component } from "react";
import {
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FormCard from "../Auth/components/FormCard";
import CircularProgress from "../../components/CircularProgress";
import { updateProfileAction } from "../../services/actions/auth";
import { decryptProfile } from "../../services/CryptoEncrypt";
import { updateAuthAction } from "../../services/actions/auth";

class Main extends Component {
  constructor(props) {
    super(props);

    const decryptKey = this.props.auth.currentIdentity.privateKey;
    const profile = decryptProfile(this.props.auth.me.metadata, decryptKey);
    const { generatedPassword } = this.props.auth;

    this.state = {
      ...profile,
      showWarn: false,
      isOpenPasswordModal:
        generatedPassword !== undefined && generatedPassword.length > 0,
    };
  }

  checkValidation() {
    return (
      this.state.email !== "" &&
      this.state.address !== "" &&
      this.state.DOB !== "" &&
      this.state.name !== ""
    );
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
    };
    this.props.actions.updateProfileAction(payload);
  }

  togglePasswordModal() {
    this.props.actions.updateAuthAction({
      ...this.props.auth,
      generatedPassword: "",
    });
    this.setState({
      isOpenPasswordModal: !this.state.isOpenPasswordModal,
    });
  }

  render() {
    return (
      <FormCard title="Profile">
        {this.state.showWarn && this.checkValidation() === false && (
          <Label>All Fields are required</Label>
        )}

        {this.props.app.error && <Label>{this.props.app.errorMessage}</Label>}

        <Modal
          isOpen={this.state.isOpenPasswordModal}
          toggle={this.togglePasswordModal.bind(this)}
          backdrop="static"
        >
          <ModalHeader toggle={this.togglePasswordModal.bind(this)}>
            Keep your password safe!
          </ModalHeader>
          <ModalBody className="text-center">
            <p>
              Your password is <b>{this.props.auth.generatedPassword}</b>
            </p>
            <br />
            <p>
              <b>NOTE!</b> Please save this password in a secret place. If you
              forget the password, you won't be able to see your information.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.togglePasswordModal.bind(this)}
            >
              OK
            </Button>
          </ModalFooter>
        </Modal>

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

        {this.props.app.loading ? (
          <CircularProgress />
        ) : (
          <button
            className="form__btn mb-5 mt-3"
            type="button"
            onClick={this.handleSubmit.bind(this)}
          >
            UPDATE
          </button>
        )}

        <br />
      </FormCard>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    updateProfileAction,
    updateAuthAction,
  };

  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
