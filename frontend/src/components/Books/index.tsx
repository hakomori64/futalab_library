import {
    useEffect,
    useState 
} from 'react';
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
import { isBindingElement } from 'typescript';
import noimage from "./../../img/NoImage.svg";
const axios = require('axios');

interface BooksInfoTableProps {
    isbn: string;
    quantity: number;
}

const BooksInfoTable = ({ isbn, quantity}: BooksInfoTableProps) => {

    return (<Table borderless>
        <tbody>
            <tr>
                <th>ISBN</th>
                <td className="text-center">{isbn}</td>
            </tr>
            <tr>
                <th>残り冊数</th>
                <td className="text-center">{quantity}</td>
            </tr>
        </tbody>
    </Table>);
};

const Books = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3001/api/books');
            setBooks(await res.json());
        })();
    }, []);

    console.log(books);

    return (<CardDeck>
        {books.map((book_info, idx) => (
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
                    <Card.Img variant="top" src={book_info['cover_image_url'] !== "" ? book_info['cover_image_url'] : noimage} />
                    <Card.Body>
                        <Card.Title>{book_info['title']}</Card.Title>
                        <BooksInfoTable isbn={book_info['isbn']} quantity={book_info['quantity']} />
                        <LinkContainer to={'/info/'+idx}>
                            <Button >Show detail</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
            </Col>
        ))}
    </CardDeck>);
}

export default Books;