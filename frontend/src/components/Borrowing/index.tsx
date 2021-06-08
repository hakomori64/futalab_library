import { Form } from "react-bootstrap";

const Borrowing = () => (
    <>
        <h1>This is the page to borrow books.</h1>
        <Form>
            名前:<input type="text" />
            借りる数:<input type="number" />
            <input type="submit" />
        </Form>
    </>
);

export default Borrowing;