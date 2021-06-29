import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./Header.css";

const Header = () => (
  <Navbar bg="dark" expand="lg" variant="dark">
    <LinkContainer to="/">
      <Navbar.Brand>布田研究室 書籍管理システム</Navbar.Brand>
    </LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <LinkContainer to="/books">
          <Nav.Link>Books</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/rentals">
          <Nav.Link>Rentals</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
