import React, {
    FC,
    useEffect,
    useState
} from 'react';
import { Button, Form } from "react-bootstrap";
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
    })

    // 履歴を見て過去何冊借りられたか総和を求める
    const borrow_nums = (book.borrows ?? []).reduce((sum, borrow) => sum + borrow['quantity'], 0);
    // 履歴を見て過去何冊返却されたか総和を求める
    const return_nums = (book.returns ?? []).reduce((sum, rtn) => sum + rtn['quantity'], 0);
    // 以上の変数を用いて、
    // 最大冊数(book['quantity']) - 過去何冊借りられたか(borrow_num) + 過去何冊返却されたか(return_num)
    // で、今研究室に何冊残っているかを求められる
    const remain_books = book.quantity - borrow_nums + return_nums;

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
        if (bookNum <= 0) {
            setBookNumErr("0冊以下は借りられません");
            errorOccured = true;
        }
        if (remain_books - bookNum < 0) {
            setBookNumErr("指定された冊数は在庫がありません。");
            errorOccured = true;
        }
        if (name.length === 0) {
            setNameErr("借りる人の名前を入力してください。");
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

            if (res.status === 201) {
                history.replace('/rentals');
            }
        }
    };

    return (
        <>
            <h1 style={{fontFamily: "Georgia, serif, sans-serif"}}>{book.title} を借りる</h1>
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
                    {nameErr !== "" ? <span className="small text-danger" >{nameErr}</span> : <></>}
                </Form.Group>
                <Form.Group controlId="formBorrowBooksQuantity">
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
                    {bookNumErr !== "" ? <span className="small text-danger" >{bookNumErr}</span> : <></>}
                </Form.Group>
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default Borrowing;