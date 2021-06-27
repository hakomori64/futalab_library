import React, { FC, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Book } from "../../types";

type BookIdProps = RouteComponentProps<{
  id: string;
}>;

const Borrowing: FC<BookIdProps> = (props) => {
  const id = props.match.params.id;

  // formの値を保存する
  const [userName, setUserName] = useState("");
  const [userNameErr, setUserNameErr] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [quantityErr, setQuantityErr] = useState("");

  const history = useHistory();

  const [book, setBook] = useState({} as Book);

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:3001/api/books/` + id);
      setBook(await res.json());
    })();
  }, []);

  const borrowed_history_sum = (book.borrows ?? []).reduce(
    (sum, borrow) => sum + borrow["quantity"],
    0
  );
  const returned_history_sum = (book.returns ?? []).reduce(
    (sum, rtn) => sum + rtn["quantity"],
    0
  );
  const remain_books =
    book.quantity - borrowed_history_sum + returned_history_sum;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleNameChange");
    console.log(event.target.value);
    setUserName(event.target.value);
  };
  const handleBookNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleBookNumChange");
    console.log(event.target.value);
    console.log(Number(event.target.value));
    setQuantity(Number(event.target.value));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("user_name " + userName);
    console.log("num " + quantity);

    let errorOccured = false;
    if (quantity <= 0) {
      setQuantityErr("0冊以下は借りられません");
      errorOccured = true;
    }
    if (remain_books - quantity < 0) {
      setQuantityErr("指定された冊数は在庫がありません。");
      errorOccured = true;
    }
    if (userName.length === 0) {
      setUserNameErr("借りる人の名前を入力してください。");
      errorOccured = true;
    }

    if (!errorOccured) {
      const res = await fetch("http://localhost:3001/api/borrows", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: userName,
          quantity: quantity,
          book_id: id,
        }),
      });

      if (res.status === 201) {
        history.replace("/rentals");
      }
    }
  };

  return (
    <>
      <h1 style={{ fontFamily: "Georgia, serif, sans-serif" }}>
        {book.title} を借りる
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUserName">
          <Form.Label>あなたのお名前</Form.Label>
          <Form.Control
            type="text"
            placeholder="あなたの名前を入力してください"
            value={userName}
            onChange={handleNameChange}
          />
          {userNameErr !== "" ? (
            <span className="small text-danger">{userNameErr}</span>
          ) : (
            <></>
          )}
        </Form.Group>
        <Form.Group controlId="formBorrowBooksQuantity">
          <Form.Label>借りる冊数</Form.Label>
          <Form.Control
            type="number"
            placeholder="借りる本の冊数を入力してください"
            defaultValue={1}
            value={quantity}
            onChange={handleBookNumChange}
          />
          {quantityErr !== "" ? (
            <span className="small text-danger">{quantityErr}</span>
          ) : (
            <></>
          )}
        </Form.Group>
        <Button type="submit">送信</Button>
      </Form>
    </>
  );
};

export default Borrowing;
