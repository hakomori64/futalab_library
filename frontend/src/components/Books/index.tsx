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
import noimage from "./../../img/NoImage.svg";
import { Book } from '../../types';

interface BooksInfoTableProps {
    isbn: string;
    quantity: number;
}

const BooksInfoTable = ({ isbn, quantity}: BooksInfoTableProps) => {

    return (
        <Table borderless>
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
        </Table>
    );
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
        <div className="mt-3 d-flex flex-row justify-content-end">
            <LinkContainer to={'/register'}>
                <Button className="btn-lg" >本を登録する</Button>
            </LinkContainer>
        </div>
        <CardDeck>
            {books.map((book_info, idx) => {
                // 履歴を見て過去何冊借りられたか総和を求める
                const borrow_num = (book_info['borrows'] ?? []).reduce((sum, borrow) => sum + borrow['quantity'], 0);
                // 履歴を見て過去何冊返却されたか総和を求める
                const return_num = (book_info['returns'] ?? []).reduce((sum, rtn) => sum + rtn['quantity'], 0);
                // 以上の変数を用いて、
                // 最大冊数(book_info['quantity']) - 過去何冊借りられたか(borrow_num) + 過去何冊返却されたか(return_num)
                // で、今研究室に何冊残っているかを求められる
                return (
                    <Col className="container-fluid mt-4 px-0" key={idx}>
                        <Card key={idx}>
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