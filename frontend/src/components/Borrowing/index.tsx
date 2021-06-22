import React, {
    FC,
    useEffect,
    useState
} from 'react';
import { Button, Form, FormControl } from "react-bootstrap";
import {
    RouteComponentProps, useHistory,
} from 'react-router-dom';
import { Book } from '../../types';

type BookIdProps = RouteComponentProps<{
    id: string;
}>;

const Borrowing: FC<BookIdProps> = (props) => {
    const id = props.match.params.id;

    // formの値を保存する
    const [name, setName] = useState("");
    const [nameErr, setNameErr] = useState("");
    const [bookNum, setBookNum] = useState(0);
    const [bookNumErr, setBookNumErr] = useState("");

    const history = useHistory();

    const [book, setBook] = useState({} as Book)

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/api/books/` + id);
            setBook(await res.json());
        })()
    }, [])
    const borrow_nums = (book.borrows ?? []).reduce((sum, borrow) => sum + borrow['quantity'], 0);
    const return_nums = (book.returns ?? []).reduce((sum, rtn) => sum + rtn['quantity'], 0);
    const remain = book.quantity - borrow_nums + return_nums;

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleNameChange");
        console.log(event.target.value);
        setName(event.target.value)
    }
    const handleBookNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleBookNumChange");
        console.log(event.target.value);
        console.log(Number(event.target.value));
        setBookNum(Number(event.target.value));
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("user_name " + name);
        console.log("num " + bookNum);

        let errorOccured = false;
        if (bookNum < 0) {
            setBookNumErr("借りる冊数は０より大きい値を指定してください。");
            errorOccured = true;
        }
        if (remain - bookNum < 0) {
            setBookNumErr("借りすぎです");
            errorOccured = true;
        }
        if (name.length == 0) {
            setNameErr("あなたの名前を入力してください。");
            errorOccured = true;
        }

        if (!errorOccured) {
            const res = await fetch('http://localhost:3001/api/borrows', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "user_name": name,
                    "quantity": bookNum,
                    "book_id": id
                })
            });

            if (res.status == 201) {
                history.replace('/rentals');
            }
        }
    };

    return (
        <>
            <h1>{book.title} レンタル要求</h1>
            <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formUserName">
                    <Form.Label>
                        あなたのお名前
                    </Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="あなたの名前を入力してください"
                        value={name}
                        onChange={handleNameChange}
                    />
                </Form.Group>
                <Form.Group controlId="formNumOfBooks">
                    <Form.Label>
                        借りる冊数
                    </Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="借りる本の冊数を入力してください"
                        defaultValue={1}
                        value={bookNum}
                        onChange={handleBookNumChange}
                    />
                </Form.Group>
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default Borrowing;