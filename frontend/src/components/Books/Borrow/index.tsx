import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchBooks, selectBook } from "store/bookSlice";
import { fetchRentals } from "store/rentalSlice";
import { selectGroup } from "store/groupSlice";
import { borrowBook } from '../../../repositories/borrowRepository';

type RentalBorrowParams = {
  id: string,
};

const BookBorrow = () => {

  const dispatch = useDispatch();
  const { loading, books } = useSelector(selectBook);
  const { selectedGroupId, groups } = useSelector(selectGroup);
  const { id } = useParams<RentalBorrowParams>(); // book_id

  // formの値を保存する
  const [quantity, setQuantity] = useState(0);
  const [quantityErr, setQuantityErr] = useState("");

  const [error, setError] = useState('');

  const book = books.find((book) => book.id === +id);
  const group = groups.find((group) => group.id === selectedGroupId);

  useEffect(() => {
    (async () => {
      if (selectedGroupId != null) {
        dispatch(fetchBooks(selectedGroupId));
      }
    })();
  }, [dispatch, selectedGroupId]);


  if (loading) {
    return (<div>loading...</div>);
  }

  if (book === undefined || group === undefined) {
    return (<div>No book available</div>);
  }

  const handleBookNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let errorOccured = false;
    if (quantity <= 0) {
      setQuantityErr("0冊以下は借りられません");
      errorOccured = true;
    }
    if (book.remain - quantity < 0) {
      setQuantityErr("指定された冊数は在庫がありません。");
      errorOccured = true;
    }

    if (!errorOccured) {
      try {
        await borrowBook(selectedGroupId!, {
          quantity: quantity,
          book_id: +id,
          group_id: selectedGroupId!
        });
        dispatch(fetchRentals(selectedGroupId!));
      } catch (error) {
        setError('貸し出し処理中にエラーが発生しました');
      }
    }
  };

  return (
    <>
      <h1 style={{ fontFamily: "Georgia, serif, sans-serif" }}>
        {book.title} を借りる
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBorrowBooksQuantity">
          <Form.Label>借りる冊数</Form.Label>
          <Form.Control
            type="number"
            placeholder="借りる本の冊数を入力してください"
            defaultValue={1}
            value={quantity}
            onChange={handleBookNumChange}
          />
          {quantityErr !== "" && <span className="small text-danger">{quantityErr}</span>}
        </Form.Group>
        <Button type="submit">送信</Button>
      </Form>
      {error !== "" && <div>{error}</div>}
    </>
  );
};

export default BookBorrow;
