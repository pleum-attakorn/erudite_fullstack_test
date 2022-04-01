import React, { FunctionComponent } from "react";
import { Modal, Button } from "react-bootstrap";
import { baseUrl } from "../../store/const";
import { useState } from "react";

export type ResetProps = {};

const Reset: FunctionComponent<ResetProps> = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const refreshData = () => {
        fetch(`${baseUrl}/refresh/`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
        })
        setShow(true)    
    }

    return (
        <>
        <Button variant='outline-warning' onClick={refreshData}>
        reset data (when you insert new row/column must press before refresh page)
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
                data is reseted
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
        </>

    );

};

export default Reset;