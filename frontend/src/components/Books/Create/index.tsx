import React, { useState, } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBook } from "../../../repositories/bookRepository";
import { selectGroup } from "store/groupSlice";
import { fetchBooks } from "store/bookSlice";
import { uploadPhoto } from 'repositories/photoRepository';

const BookCreate = () => {

  const dispatch = useDispatch();
  const { selectedGroupId } = useSelector(selectGroup);

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState("");

  const [isbn, setIsbn] = useState("");
  const [isbnErr, setIsbnErr] = useState("");

  const [quantity, setQuantity] = useState(0);
  const [quantityErr, setQuantityErr] = useState("");

  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [coverImageUrlErr, setCoverImageUrlErr] = useState("");

  const [error, setError] = useState("");

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

    try {
      const data = await uploadPhoto(formData);
      setCoverImageUrl(data['cover_image_url']);
    } catch (err) {
      setCoverImageUrlErr('画像の選択に失敗しました。');
    }
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

    if (!errorOccured) {
      try {
        await createBook(selectedGroupId!, {
          title: title,
          isbn: isbn,
          cover_image_url: coverImageUrl,
          quantity: quantity,
          group_id: selectedGroupId!
        });
        dispatch(fetchBooks(selectedGroupId!));
        history.replace("/books");
      } catch (error) {
        setError('書籍の登録中にエラーが発生しました。');
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
            placeholder="本の冊数を入力してください"
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
              <img src={coverImageUrl} alt="uploaded book thumbnail" width="180px" height="240px" />
            </div>}
          {coverImageUrlErr !== "" && <span className="small text-danger">{coverImageUrlErr}</span>}
        </Form.Group>
        <Button type="submit">送信</Button>
      </Form>
      {error && <div>{error}</div>}
    </>
  );
};

export default BookCreate;
