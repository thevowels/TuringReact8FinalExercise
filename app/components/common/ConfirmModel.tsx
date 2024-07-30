'use client'
import {Modal} from "react-bootstrap";

export default function ConfirmModel(
    {handleClose,
        show,
        render}:
        {handleClose: () => void,
            show: boolean,
            render: () => any
        }) {
    return(
            <Modal show={show} onHide = {handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Something</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {
                        render()
                    }
                </Modal.Body>
            </Modal>
    )
 }