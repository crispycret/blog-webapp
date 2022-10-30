import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Props } from '../../App';



export const MyNavbar = (props: Props) => {


    return (
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container fluid={true} >
          <Navbar.Brand href='/'>Brandon Nadeau's Blog</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            
              {/* Constant Navigation */}
              <Nav>
              <Nav.Link onClick={e => window.location.href='https://www.bnadeau.dev/'}>Portfolio</Nav.Link>
              {/* <Nav.Link onClick={e => window.location.href='https://www.bnadeau.dev/#projects'}>Projects</Nav.Link> */}
              {/* <Nav.Link href="#about">About</Nav.Link> */}
              {/* <Nav.Link href="#resume">Resume</Nav.Link> */}
              {/* <Nav.Link href="/">Blog</Nav.Link>   */}
            </Nav>

            <Nav className='ms-auto'>

              {/* Display Features to authenticate */}
              {!props.user.active &&
                // Enable the Authentication component
                <Nav.Link href="#pages" onClick={e => props.setShowAuth(true)}>Login</Nav.Link>
              }

              {/* Display Features with authentication */}
              <NavDropdown title={props.user.email} id="basic-nav-dropdown">

                {/* Basic Authentication */}
                {props.user.active && 
                  <>
                      <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                      <NavDropdown.Divider />

                      {/* Admin Authentication */}
                      {props.user.active && props.user.isAdmin &&
                        <>
                          <NavDropdown.Item href='/dashboard'>Dashboard</NavDropdown.Item>
                          <NavDropdown.Item href='/post/create'>New Post</NavDropdown.Item>
                          <NavDropdown.Divider />
                        </>
                      }

                      <NavDropdown.Item href="#" onClick={props.user.logout}>Logout</NavDropdown.Item>
                  </>
                }
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    );
    
}


export default MyNavbar;