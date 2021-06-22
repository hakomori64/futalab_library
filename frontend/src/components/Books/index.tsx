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
import { Book } from '../../types';

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
    const [books, setBooks] = useState([] as Book[]);
    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3001/api/books');
            setBooks(await res.json());
        })();
    }, []);


    return (
    <>
        <CardDeck>
            {books.map((book_info, idx) => {
                const borrow_num = (book_info['borrows'] ?? []).reduce((sum, borrow) => sum + borrow['quantity'], 0);
                const return_num = (book_info['returns'] ?? []).reduce((sum, rtn) => sum + rtn['quantity'], 0);
                return (
                    <Col className="container-fluid mt-4 px-0" key={idx}>
                        <Card key={idx}>
                            <Card.Header>
                                <Nav variant="tabs" defaultActiveKey="#info">
                                    <Nav.Item>
                                        <Nav.Link href="#info">情報</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="#edit">更新</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Img
                                variant="top"
                                src={book_info['cover_image_url'] !== "" ? book_info['cover_image_url'] : noimage}
                                height="400"
                                style={{objectFit: "contain", padding: "5px"}}
                            />
                            <Card.Body>
                                <Card.Title>{book_info['title']}</Card.Title>
                                <BooksInfoTable isbn={book_info['isbn']} quantity={book_info['quantity'] - borrow_num + return_num} />
                                <LinkContainer to={'/info/'+book_info['id']}>
                                    <Button >Show detail</Button>
                                </LinkContainer>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
        </CardDeck>
    </>
    );
}

export default Books;