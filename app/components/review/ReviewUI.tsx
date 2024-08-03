"use client"

import {Review} from "@/lib/features/reviews/reviewApi";
import styles from "@/app/movies/movie.module.css"
import {useState} from "react";
import { Rating as ReactRating } from '@smastrom/react-rating'
import {Modal} from "react-bootstrap";
import ReviewForm from "@/app/components/review/ReviewForm";
import ConfirmModel from "@/app/components/common/ConfirmModel";
import {useDeleteReviewMutation} from "@/lib/features/review/reviewApi";


export default function ReviewUI({review}: {review: Review } ) {
    // const [rating, setRating] = useState(0)
    const [show,setShow]=useState(false);

    const [ deleteReviewApi, deleteReviewApiResult ] = useDeleteReviewMutation();
    const [ showConfirm, setShowConfirm] = useState(false);


    const handleClose = ()=>{setShow(false);};
    const handleShow = ()=>{setShow(true);};


    function handleYes() {
        console.log('Yes');
        deleteReviewApi(review)
            .unwrap()
            .then(data =>{console.log('deleted Review', data)})
        setShowConfirm(false)
    }

    function handleNo() {
        alert("You  didn't deleted")
        setShowConfirm(false)
    }

    return(
        <div className={styles.movieContainer}>
            <ReactRating style={{maxWidth: 100}} value={review.rating} readOnly/>
            &nbsp;
            <div>{review.review}</div>
            <button type={"button"} className={"btn btn-primary"} onClick={handleShow}>Edit</button>
            &nbsp;
            <button type={"button"} className={"btn btn-outline-danger"} onClick={()=>setShowConfirm(true)}>Delete</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Update Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ReviewForm review={review} movieId={review.movie._id} closeModal={handleClose}/>
                </Modal.Body>
            </Modal>

            <ConfirmModel handleClose={()=>setShowConfirm(false)}
                          show={showConfirm}
                          render={ ()=>{
                              return(
                                  <div>
                                      <h1> Are you sure you want to Delete?</h1>
                                      <button type={"button"}
                                              className={"btn btn-danger"}
                                              onClick={handleYes}>Yes</button>
                                      &nbsp;
                                      <button type={"button"}
                                              className={"btn btn-warning"}
                                              onClick={handleNo}>No</button>
                                  </div>
                              )

                          }}/>

        </div>
    )
}