import {
    FC,
    useEffect,
    useState,
} from "react";
import { Button, Table } from "react-bootstrap";
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
    })

    // 履歴を見て過去何冊借りられたか総和を求める
    const borrowed_history_sum = (book.borrows ?? []).reduce((sum, borrow) => sum + borrow['quantity'], 0);
    // 履歴を見て過去何冊返却されたか総和を求める
    const returned_history_sum = (book.returns ?? []).reduce((sum, rtn) => sum + rtn['quantity'], 0);

    return (
        <>
            <h1>{book['title']}</h1>
            <img src={book['cover_image_url'] !== "" ? book['cover_image_url'] : noimage} alt="book cover" />
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
                        <td>{book['quantity'] - borrowed_history_sum + returned_history_sum}/{book['quantity']}</td>
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