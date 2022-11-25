import { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

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
                <Nav.Link href='' onClick={e => props.setShowAuth(true)}>Login</Nav.Link>
              }

                {/* Display Features with authentication */}
                {/* Basic Authentication */}
                {props.user.active && 
                
                  <NavDropdown title={props.user.email} id="basic-nav-dropdown">

                      <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                      <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>


                      {/* Email Verified */}
                      {props.user.emailVerified &&
                        <>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href='/dashboard'>Dashboard</NavDropdown.Item>
                          {/* <NavDropdown.Item href='/dashboard/post/create'>New Post</NavDropdown.Item> */}
                        </>
                      }

                      {/* Admin Authentication */}
                      {props.user.privilege > 0 &&
                        <>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href='/admin/dashboard'>Admin Dashboard</NavDropdown.Item>
                        </>
                      }

                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#" onClick={props.user.logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              }

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    );
    
}


export default MyNavbar;