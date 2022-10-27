import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



export const MyNavbar = (props: any) => {


    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container fluid={true} >
          <Navbar.Brand href='#'>Brandon Nadeau's Blog</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
            <Nav>
              {/* Constant Navigation */}
              <Nav.Link href="#portfolio">Portfolio</Nav.Link>
              <Nav.Link href="#projects">Projects</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#resume">Resume</Nav.Link>
              <Nav.Link href="#blog">Blog</Nav.Link>  
            </Nav>

            <Nav className='ms-auto'>
              {/* Display Features with authentication */}
              {props.user.active &&
                <NavDropdown title={props.user.email} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={props.user.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              }

              {/* Display Features to authenticate */}
              {!props.user.active &&
                // Enable the Authentication component
                <Nav.Link href="#pages" onClick={e => props.setShowAuth(true)}>Login</Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    );
    
}


export default MyNavbar;