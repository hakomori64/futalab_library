import { 
    Card,
    Table,
    Nav,
    Button,
    CardDeck,
    Col,
} from "react-bootstrap";
import {
    LinkContainer,
} from 'react-router-bootstrap';
import noimage from "./../../img/NoImage.svg";

const BooksInfoTable = () => (
    <Table borderless>
        <tbody>
            <tr>
                <th>ISBN</th>
                <td className="text-center">{"XXXXXXXXXX"}</td>
            </tr>
            <tr>
                <th>残り冊数</th>
                <td className="text-center">{12}</td>
            </tr>
        </tbody>
    </Table>
);

const Books = () => (
    <CardDeck>
        {['Hello', 'Hi', 'How are U?', 'I\'m fine.', 'Hello', 'Hi', 'How are U?', 'I\'m fine.'].map((book_info, idx) => (
            <Col className="container-fluid mt-4 px-0" key={idx}>
                <Card key={idx}>
                    <Card.Header>
                        <Nav variant="tabs" defaultActiveKey="#info">
                            <Nav.Item>
                                <Nav.Link href="#info">info</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#edit">edit</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Img variant="top" src={noimage} />
                    <Card.Body>
                        <Card.Title>{book_info}</Card.Title>
                        <BooksInfoTable />
                        <LinkContainer to={'/info/'+idx}>
                            <Button >Show detail</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </CardDeck>
);

export default Books;