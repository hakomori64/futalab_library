import { Nav, Navbar } from "react-bootstrap";

import './header.css';

const Header = () => (
    <Navbar bg="dark" expand="lg">
        <Navbar.Brand href="#home">布田研究室 書籍管理システム</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#books">Books</Nav.Link>
                <Nav.Link href="#rentals">Rentals</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default Header;