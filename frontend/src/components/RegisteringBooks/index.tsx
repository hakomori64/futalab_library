import React, { FC, useEffect, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const RegisteringBooks: FC<{}> = () => {
  const history = useHistory();
  const imageRef = useRef(null);

  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState("");

  const [isbn, setIsbn] = useState("");
  const [isbnErr, setIsbnErr] = useState("");

  const [quantity, setQuantity] = useState(0);
  const [quantityErr, setQuantityErr] = useState("");

  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [coverImageUrlErr, setCoverImageUrlErr] = useState("");

  // onChange handlers
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsbn(event.target.value);
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuantity(Number(event.target.value));
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files == null || event.target.files.length !== 1) {
      return;
    }

    let formData = new FormData();
    formData.append("image", event.target.files[0]);

    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/photos`, {
      method: "POST",
      body: formData,
    });
    setCoverImageUrl((await res.json())["cover_image_url"]);
  };

  // handle submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleErr("");
    setIsbnErr("");
    setQuantityErr("");
    setCoverImageUrlErr("");

    let errorOccured = false;
    if (title.length === 0) {
      setTitleErr("本の名前を入力してください");
      errorOccured = true;
    }
    if (!isbn.match(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g)) {
      setIsbnErr("有効なISBNではありません");
      errorOccured = true;
    }
    if (quantity <= 0) {
      setQuantityErr("0以上の値を入力してください");
      errorOccured = true;
    }

    /*
    const re = new RegExp(
      "^https?://(?:[a-z0-9-]+.)+[a-z]{2,6}(?:/[^/#?]+)+.(?:jpg|gif|png)$"
    );
    if (coverImageUrl !== "" && !coverImageUrl.match(re)) {
      console.log(coverImageUrl);
      setCoverImageUrlErr(
        "画像のURLに問題があるようです。アップし直してみてください。"
      );
      errorOccured = true;
    }*/

    if (!errorOccured) {
      const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/books/`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          isbn: isbn,
          cover_image_url: coverImageUrl,
          quantity: quantity,
        }),
      });

      if (res.status === 201) {
        history.replace("/books");
      }
    }
  };

  return (
    <>
      <h1 style={{ fontFamily: "Georgia, serif, sans-serif" }}>本を登録する</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>本の名前</Form.Label>
          <Form.Control
            type="text"
            placeholder="本の名前を入力してください"
            value={title}
            onChange={handleNameChange}
          />
          {titleErr !== "" && <span className="small text-danger">{titleErr}</span>}
        </Form.Group>
        <Form.Group>
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="ISBNを入力してください"
            value={isbn}
            onChange={handleIsbnChange}
          />
          {isbnErr !== "" && <span className="small text-danger">{isbnErr}</span>}
        </Form.Group>
        <Form.Group>
          <Form.Label>在庫数</Form.Label>
          <Form.Control
            type="number"
            placeholder="研究室で持っている本の冊数を入力してください"
            value={quantity}
            onChange={handleQuantityChange}
          />
          {quantityErr !== "" && <span className="small text-danger">{quantityErr}</span>}
        </Form.Group>
        <Form.Group>
          <Form.Label>表紙の画像をアップロードしてください。</Form.Label>
          <Form.File key={coverImageUrl} type="file" custom>
            <div className="position-relative" >
              <Form.File.Input onChange={handleFileChange} className="position-absolute" style={{width: "100px"}} />
              <Button className="position-absolute top-50 start-50">画像を選択</Button>
            </div>
          </Form.File>
          {coverImageUrl !== "" &&
            <div style={{width: "180px", height: "280px" }}>
              <Button className="btn btn-circle button-close" onClick={() => setCoverImageUrl("")}>リセット</Button>
              <img src={coverImageUrl} width="180px" height="240px" />
            </div>}
          {coverImageUrlErr !== "" && <span className="small text-danger">{coverImageUrlErr}</span>}
        </Form.Group>
        <Button type="submit">送信</Button>
      </Form>
    </>
  );
};

export default RegisteringBooks;
