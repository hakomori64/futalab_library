import { FC, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { RouteComponentProps, useParams } from "react-router-dom";
import noimage from "./../../../img/NoImage.svg";
import { Book } from "../../../types";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, selectBook } from "store/bookSlice";
import { selectGroup, setSelectedGroupId } from "store/groupSlice";

type BookInfoParams = {
  id: string;
}

const BookInfo = () => {
  
  const dispatch = useDispatch();
  const { loading, books } = useSelector(selectBook);
  const { selectedGroupId } = useSelector(selectGroup);
  const { id } = useParams<BookInfoParams>();

  console.log(`selectedGroupId: ${selectedGroupId}`);

  useEffect(() => {
    (async () => {
      if (selectedGroupId != null) {
        dispatch(fetchBooks(selectedGroupId))
      }
    })();
  }, [dispatch, selectedGroupId]);

  if (loading) {
    return (<div>loading...</div>);
  }

  console.log(`build books: ${books}`);

  const book = books.find((book) => book.id === +id);
  if (book === undefined) {
    return (<div>No book available</div>);
  }


  return (
    <>
      <h1>{book["title"]}</h1>
      <img
        src={book["cover_image_url"] !== "" ? book["cover_image_url"] : noimage}
        alt="book cover"
        width="500px"
      />
      <div className="my-3 d-flex flex-row">
        <div className="mx-1">
          <LinkContainer to={`/books/${id}/edit`}>
            <Button>本の情報を編集する</Button>
          </LinkContainer>
        </div>
        <div>
          <LinkContainer to={"/borrow/" + id}>
            <Button>借りる</Button>
          </LinkContainer>
        </div>
      </div>
      <Table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{book["id"]}</td>
          </tr>
          <tr>
            <th>ISBN</th>
            <td>{book["isbn"]}</td>
          </tr>
          <tr>
            <th>残り冊数/最大</th>
            <td>
              {book.remain}/{book.quantity}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default BookInfo;
