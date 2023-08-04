import React from 'react'
import { Badge, Col, ListGroup, Row, Modal, Button } from 'react-bootstrap';

const ModalKeranjang = ({ showModal, handleClose, handleShow }) => {
    return (
        < Modal show={showModal} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal >
    )
}

export default ModalKeranjang