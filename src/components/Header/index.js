import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';

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
                      <NavLink href="/logout">LOG OUT</NavLink>
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

export default connect(mapStateToProps)(Header);
