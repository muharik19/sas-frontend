import React from "react";
import Link from "next/link";
import { Container, Navbar, Nav } from "react-bootstrap";
import { removeToken } from "../lib/auth";

const NavBar = ({ children }) => {
  return (
    <Container className="p-0" fluid={true}>
      <Navbar className="border-bottom" bg="transparent" expand="lg">
        <Navbar.Brand>SAS</Navbar.Brand>
        <Navbar.Toggle className="border-0" aria-controls="navbar-toggle" />
        <Navbar.Collapse id="navbar-toggle">
          <Nav className="ml-auto">
            <div
              onClick={() => {
                removeToken();
              }}
            >
              <Link className="nav-link" href="/">
                SIGN OUT
              </Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="space-height">{children}</div>
    </Container>
  );
};

export default NavBar;
