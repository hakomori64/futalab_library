import {
    useState,
} from 'react';
import {
    Table,
    Image,
    Button,
    Modal,
} from 'react-bootstrap';
import returnArrow from "./return_arrow.webp";


const Rentals = () => {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <h1>Rental history</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User name</th>
                        <th>State</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>冊数</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {[{"id":1, "name":"Hoge", "state":"返却", "title":"Hoge", "date":"2021/1/1", "num":1},
                      {"id":2, "name":"Fuga", "state":"貸出", "title":"Fuga", "date":"2020/1/1", "num":1}].map((col_item, idx) => (
                        <tr key={idx}>
                            <th>{col_item.id}</th>
                            <td>{col_item.name}</td>
                            <td>{col_item.state}</td>
                            <td>{col_item.title}</td>
                            <td>{col_item.date}</td>
                            <td>{col_item.num}</td>
                            <td>
                                <Image src={returnArrow} style={{width:"18px"}} onClick={handleShow} rounded />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal
                show={show}
                onHide={handleClose}
            >
                <Modal.Body>
                    <Modal.Title>Do you return the book?</Modal.Title>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark">
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Rentals;