import React, {
	FC,
	useEffect,
	useState,
} from 'react';
import { Button, Form } from "react-bootstrap";
import {
	RouteComponentProps,
	useHistory
} from 'react-router-dom';
import { Book } from '../../types';

type BookIdProps = RouteComponentProps<{
	id: string;
}>;

const BookEdit: FC<BookIdProps> = (props) => {
	const id = props.match.params.id;

	const [book, setBook] = useState({} as Book);
	const history = useHistory();

	const [name, setName] = useState("");
	const [nameErr, setNameErr] = useState("");
	const [isbn, setIsbn] = useState("");
	const [isbnErr, setIsbnErr] = useState("");
	const [numberOfBooks, setNumberOfBooks] = useState(0);
	const [numberOfBooksErr, setNumberOfBooksErr] = useState("");

	// onChange handlers
	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleIsbnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsbn(event.target.value);
	};

	const handleNumberOfBooksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNumberOfBooks(Number(event.target.value));
	};

	// handle submit
	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setNameErr("");
		setIsbnErr("");
		setNumberOfBooksErr("");

		let errorOccured = false;
		if (name.length === 0) {
			setNameErr("本の名前を入力してください");
			errorOccured = true
		}
		if (!isbn.match(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g)) {
			setIsbnErr("有効なISBNではありません");
			errorOccured = true;
		}
		if (numberOfBooks < 0) {
			setNumberOfBooksErr("0以上の値を入力してください");
			errorOccured = true;
		}

		if (!errorOccured) {
			console.log("here");
			const res = await fetch('http://localhost:3001/api/books/' + id, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"title": name,
					"isbn": isbn,
					"quantity": numberOfBooks,
				})
			});

			if (res.status === 200) {
				history.replace('/info/' + id);
			}
		}
	}

	// initialize book info
	useEffect(() => {
		(async () => {
			const res = await fetch(`http://localhost:3001/api/books/` + id);
			const book: Book = await res.json();

			setName(book.title);
			setIsbn(book.isbn);
			setNumberOfBooks(book.quantity);
		})()
	}, [])

	return (
		<>
			<h1 style={{fontFamily: "Georgia, serif, sans-serif"}}>本の情報を編集する</h1>
			<Form onSubmit={handleSubmit} >
				<Form.Group>
					<Form.Label>
						本の名前
					</Form.Label>
					<Form.Control
						type="text"
						placeholder="本の名前を入力してください"
						value={name}
						onChange={handleNameChange}
					/>
					{nameErr !== "" ? <span className="small text-danger" >{nameErr}</span> : <></>}
				</Form.Group>
				<Form.Group>
					<Form.Label>
						ISBN
					</Form.Label>
					<Form.Control
						type="text"
						placeholder="ISBNを入力してください"
						value={isbn}
						onChange={handleIsbnChange}
					/>
					{isbnErr !== "" ? <span className="small text-danger" >{isbnErr}</span> : <></>}
				</Form.Group>
				<Form.Group>
					<Form.Label>
						在庫数
					</Form.Label>
					<Form.Control
						type="number"
						placeholder="研究室で持っている本の冊数を入力してください"
						value={numberOfBooks}
						onChange={handleNumberOfBooksChange}
					/>
					{numberOfBooksErr !== "" ? <span className="small text-danger" >{numberOfBooksErr}</span> : <></>}
				</Form.Group>
				<Button type="submit">
					送信
				</Button>
			</Form>
		</>
	)
}

export default BookEdit;