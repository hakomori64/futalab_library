import { useState, useEffect } from "react";
import { Table, Image, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectGroup } from "store/groupSlice";
import { fetchRentals, selectRental } from "store/rentalSlice";
import { Rental } from "../../types";
import returnArrow from "./return_arrow.webp";
import { returnBook } from '../../repositories/returnRepository';

const Rentals = () => {

  const dispatch = useDispatch();
  const { selectedGroupId } = useSelector(selectGroup);
  const { rentals } = useSelector(selectRental)

  const history = useHistory();

  const [show, setShow] = useState(false);
  const [selectedRental, setSelectedRental] = useState({} as Rental);

  const handleClose = () => {
    setShow(false);
    setSelectedRental({} as Rental);
  };

  const handleShow = (rental: Rental) => {
    setShow(true);
    setSelectedRental(rental);
  };

  const handleConfirm = async () => {

    try {
      await returnBook(selectedGroupId!, {
        quantity: selectedRental.quantity,
        book_id: selectedRental.book_id,
        group_id: selectedGroupId!
      });
      history.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (selectedGroupId != null) {
        dispatch(fetchRentals(selectedGroupId));
      }
    })();
  }, [dispatch, selectedGroupId]);

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
              <th>{rental.id}</th>
              <td>{rental.user.name}</td>
              <td>{rental.type === "return" ? "返却" : "貸出"}</td>
              <td>{rental.book.title}</td>
              <td>{new Date(rental.date).toLocaleDateString("ja-JP")}</td>
              <td>{rental.quantity}</td>
              <td>
                {rental.type === "borrow" && (
                  <Image
                    src={returnArrow}
                    style={{ width: "18px", cursor: "pointer" }}
                    onClick={() => handleShow(rental)}
                    rounded
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Modal.Title>本を返却しますか？</Modal.Title>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleConfirm}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Rentals;
