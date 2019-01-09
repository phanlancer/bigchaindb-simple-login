import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
  
import { logoutAction } from '../../services/actions/auth';

class Header extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout() {
    this.props.actions.logoutAction();
  }

  render() {
    const { authenticated } = this.props;

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <div className="container">

            <NavbarBrand href="/">Identiify</NavbarBrand>

            <NavbarToggler onClick={this.toggle} />

            <Collapse isOpen={this.state.isOpen} navbar>
              { 
                authenticated
                ? <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink onClick={this.handleLogout.bind(this)}>LOG OUT</NavLink>
                    </NavItem>
                  </Nav>
                : <Nav className="ml-auto" navbar>
                    <NavItem>
                      <NavLink href="/login">LOG IN</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="/register">REGISTER</NavLink>
                    </NavItem>
                  </Nav>
              }
            </Collapse>
            
          </div>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated
});

function mapDispatchToProps(dispatch) {
  const actions = { logoutAction };
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
