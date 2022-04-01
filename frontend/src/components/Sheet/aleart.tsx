import React, { FunctionComponent } from "react";
import { Modal, Button } from "react-bootstrap";
import { baseUrl } from "../../store/const";
import { useState } from "react";

export type AlertProps = {};

const Alert: FunctionComponent<AlertProps> = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const saveData = () => {
        fetch(`${baseUrl}/save/`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
        })
        setShow(true)
    }

    return (
        <>
        <Button variant='primary' onClick={saveData}>
            save
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                {/* <Modal.Title>Modal title</Modal.Title> */}
            </Modal.Header>
            <Modal.Body>
                save successful
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
        </>

    );

};

export default Alert;