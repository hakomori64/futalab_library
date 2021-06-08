import { FC } from 'react';
import { Button, Form } from "react-bootstrap";
import {
    RouteComponentProps
} from 'react-router-dom';

type BookIdProps = RouteComponentProps<{
    id: string;
}>;

const Borrowing: FC<BookIdProps> = (props) => {
    const id = props.match.params.id;

    return (
        <>
            <h1>This is the page to borrow books {id}.</h1>
            <Form>
                <Form.Group controlId="formUserName">
                    <Form.Label>
                        名前
                    </Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group controlId="formNumOfBooks">
                    <Form.Label>
                        借りる数
                    </Form.Label>
                    <Form.Control type="number" placeholder="Num of books" />
                </Form.Group>
                <Button type="submit">
                    Submit
                </Button>
            </Form>
        </>
    );
}

export default Borrowing;