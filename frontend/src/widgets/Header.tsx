import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

import { selectGroup, setSelectedGroupId } from '../store/groupSlice';

import "./Header.css";
import { Group } from "types";

const Header = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const { loading, error, groups, selectedGroupId } = useSelector(selectGroup);

  const index: number = groups.findIndex((group) => (group.id == selectedGroupId));

  const dispatch = useDispatch();

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <LinkContainer to={isAuthenticated ? "/Home" : "/"}>
        <Navbar.Brand>書籍管理システム</Navbar.Brand>
      </LinkContainer>
      ..{isAuthenticated ? [
        <>
        <Navbar.Toggle aria-controls="basic-navbar-nav-logged-in" />
        <Navbar.Collapse id="basic-navbar-nav-logged-in">
          <NavDropdown title={<span className="text-white">{loading ? 'Loading...' : groups.length > 0 ? groups[index].name.slice(0, 20) + (groups[index].name.length > 20 ? '...' : '') : 'グループなし'}</span>} className="text-white" id="nav-dropdown">
            {groups.slice(0, 5).map((group: Group) => {
              return (
                <NavDropdown.Item onClick={() => dispatch(setSelectedGroupId(group.id))}>{group.name.slice(0, 20) + (group.name.length > 20 ? '...' : '')}</NavDropdown.Item>
              );
            })}
            <NavDropdown.Item href="/groups">すべてのグループを表示</NavDropdown.Item>
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
            <Nav.Link onClick={() => loginWithRedirect()}>ログイン</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </>
      ]}
    </Navbar>
  );
}

export default Header;
