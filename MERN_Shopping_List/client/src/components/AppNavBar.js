import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem,
  Container
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LogOut from './auth/LogOut';

class AppNavBar extends Component {
  state = {
     isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }


render() {
  return(
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">GroceryList</NavbarBrand>
          <NavbarToggler onClick={this.toggle}/>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
            <NavItem>
              <RegisterModal />
            </NavItem>
            <NavItem>
              <LogOut />
            </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
 }
}



export default AppNavBar;
