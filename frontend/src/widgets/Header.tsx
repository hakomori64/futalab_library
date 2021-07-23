import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from 'components/Logout/LogoutButton';

import "./Header.css";

const Header = () => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <LinkContainer to={isAuthenticated ? "/Home" : "/"}>
        <Navbar.Brand>書籍管理システム</Navbar.Brand>
      </LinkContainer>
      ..{isAuthenticated ? [
        <>
        <Navbar.Toggle aria-controls="basic-navbar-nav-logged-in" />
        <Navbar.Collapse id="basic-navbar-nav-logged-in">
          <NavDropdown title={<span className="text-white">TODO グループ名</span>} className="text-white" id="nav-dropdown">
            <NavDropdown.Item href="#TODO_groups">グループ一覧</NavDropdown.Item>
            <NavDropdown.Item href="#TODO_add_group">グループを作成</NavDropdown.Item>
          </NavDropdown>
          <Nav className="mr-auto">
            <LinkContainer to="/books">
              <Nav.Link>書籍一覧</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/rentals">
              <Nav.Link>貸出・返却履歴一覧</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => {logout({ returnTo: window.location.origin })}}>ログアウト</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </>
      ] : [
        <>
        <Navbar.Toggle aria-controls="basic-navbar-nav-not-logged-in" />
        <Navbar.Collapse id="basic-navbar-nav-not-logged-in">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/login">ログイン</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </>
      ]}
    </Navbar>
  );
}

export default Header;
