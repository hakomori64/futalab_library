import { useEffect, useState } from "react";
import { Card, Table, Nav, Button, CardDeck, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import noimage from "./../../img/NoImage.svg";
import { Book } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, selectBook } from "store/bookSlice";
import { selectGroup } from "store/groupSlice";

interface BooksInfoTableProps {
  isbn: string;
  quantity: number;
}

const BooksInfoTable = ({ isbn, quantity }: BooksInfoTableProps) => {
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
  const dispatch = useDispatch();
  const { selectedGroupId } = useSelector(selectGroup)
  const { loading, error, books } = useSelector(selectBook);

  useEffect(() => {
    (async () => {
      if (selectedGroupId != null) {
        dispatch(fetchBooks(selectedGroupId));
      }
    })();
  }, [dispatch, selectedGroupId]);

  if (loading) {
    return (<div>loaidng</div>);
  }

  return (
    <>
      <div className="mt-3 d-flex flex-row justify-content-end">
        <LinkContainer to={"/register"}>
          <Button className="btn-lg">本を登録する</Button>
        </LinkContainer>
      </div>
      <CardDeck>
        {books.map((book: Book, idx) => {
          return (
            <Col className="container-fluid mt-4 px-0" key={idx}>
              <Card key={idx}>
                <Card.Img
                  variant="top"
                  src={
                    book.cover_image_url !== ""
                      ? book.cover_image_url
                      : noimage
                  }
                  height="400"
                  style={{ objectFit: "contain", padding: "5px" }}
                />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <BooksInfoTable
                    isbn={book.isbn}
                    quantity={book.remain}
                  />
                  <LinkContainer to={"/books/" + book["id"]}>
                    <Button>Show detail</Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </CardDeck>
    </>
  );
};

export default Books;
