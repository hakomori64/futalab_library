import {
    FC,
    useEffect,
    useState,
} from "react";
import { Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
    RouteComponentProps
} from 'react-router-dom';
import noimage from "./../../img/NoImage.svg";
import { Book } from "../../types";

type BookIdProps = RouteComponentProps<{
    id: string;
}>;

const Information: FC<BookIdProps> = (props) => {
    const id = props.match.params.id;

    const [book, setBook] = useState({} as Book);
    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/api/books/` + id);
            setBook(await res.json());
        })();
    }, [])

    const borrow_nums = (book.borrows ?? []).reduce((sum, borrow) => sum + borrow['quantity'], 0);
    const return_nums = (book.returns ?? []).reduce((sum, rtn) => sum + rtn['quantity'], 0);

    return (
        <>
            <h1>{book['title']}</h1>
            <img src={book['cover_image_url'] !== "" ? book['cover_image_url'] : noimage} />
            <h1>Hoge</h1>
            <LinkContainer to={'/borrow/'+id}>
                <Button>
                    借りる
                </Button>
            </LinkContainer>
            <Table>
                <tbody>
                    <tr>
                        <th>ISBN</th>
                        <td>{book['isbn']}</td>
                    </tr>
                    <tr>
                        <th>ID</th>
                        <td>{book['id']}</td>
                    </tr>
                    <tr>
                        <th>残り冊数/最大</th>
                        <td>{book['quantity'] - borrow_nums + return_nums}/{book['quantity']}</td>
                    </tr>
                    <tr>
                        <th>Last update</th>
                        <td>YYYY/MM/DD</td>
                    </tr>
                </tbody>
            </Table>
        </>
    );
}

export default Information;