import {
    useState,
    useEffect,
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
    const [rentals, setRentals] = useState([])
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        (async () => {
            const res = await fetch('http://localhost:3001/api/rentals');
            setRentals(await res.json());
        })();
    }, []);

    return (
        <>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map((rental, idx) => (
                        <tr key={idx}>
                            <th>{rental['id']}</th>
                            <td>{rental['user_name']}</td>
                            <td>{rental['type'] === 'return' ? '返却' : '貸出'}</td>
                            <td>{rental['book']['title']}</td>
                            <td>{(new Date(rental['date'])).toLocaleDateString("ja-JP")}</td>
                            <td>{rental['quantity']}</td>
                            <td>
                                {
                                    rental['type'] == 'borrow' ?
                                        <Image src={returnArrow} style={{width:"18px", cursor: "pointer"}} onClick={handleShow} rounded /> :
                                        <div></div>
                                }
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
        </>
    );
}

export default Rentals;