"use client"

import {useState} from "react";
import {Modal} from "react-bootstrap";
import ReviewForm from "@/app/components/review/ReviewForm";

export default function ReviewInput(){
    const [show,setShow]=useState(false);
    const handleClose = ()=>{setShow(false);};
    const handleShow = ()=>{setShow(true);};

    return(
        <div>
            <button className="btn btn-primary"  onClick={handleShow}>Add Review</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReviewForm closeModal={handleClose}/>
                </Modal.Body>
            </Modal>

        </div>
    )
}