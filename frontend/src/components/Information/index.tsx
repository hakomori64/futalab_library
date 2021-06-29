import { FC, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { RouteComponentProps } from "react-router-dom";
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
  }, []);

  return (
    <>
      <h1>{book["title"]}</h1>
      <img
        src={book["cover_image_url"] !== "" ? book["cover_image_url"] : noimage}
        alt="book cover"
      />
      <div className="my-3 d-flex flex-row">
        <div className="mx-1">
          <LinkContainer to={"/edit/" + id}>
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
            <th>ISBN</th>
            <td>{book["isbn"]}</td>
          </tr>
          <tr>
            <th>ID</th>
            <td>{book["id"]}</td>
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

export default Information;
