"use client"
import {Field, Form, Formik} from "formik";
import {Button, Form as BForm} from "react-bootstrap";
import styles from "@/app/movies/movie.module.css";
import * as Yup from "yup";
import {Review, useAddReviewMutation, useUpdateReviewMutation} from "@/lib/features/review/reviewApi";
import {useState} from "react";
import { Rating as ReactRating } from '@smastrom/react-rating'
import {useAddMovieMutation} from "@/lib/features/movie/movieApi";

const ReviewSchema = Yup.object().shape({
    review: Yup.string().required()
        .min(2,'Too Short')
        .max(20,'Too Long')
        .required('Required'),
    rating: Yup.number()
        .required('Required'),
})
export default function ReviewForm({review, closeModal, movieId}: {review: Review, closeModal: ()=>void, movieId: string}) {
    const initValues = {
        review: review ? review.review: "loreum",
        rating: review ? review.rating: 0
    }


    const [rating, setRating] = useState(initValues.rating)
    const [addReviewApi, addReviewApiResult] = useAddReviewMutation();
    const [ updateReviewApi, updateReviewApiResult ] = useUpdateReviewMutation();

    function updateReview(values) {
        const reviewToUpdate = {
            ...review
        }
        reviewToUpdate.movie = movieId
        reviewToUpdate.review = values.review
        reviewToUpdate.rating = rating
        console.log('Update Review ', reviewToUpdate)
        updateReviewApi(reviewToUpdate)
            .unwrap()
            .then(data => {
                console.log('Updating review success ', data)
            })
        closeModal()
    }

    const btnSubmitHandler = (values)=>{
        if(review){
            updateReview(values);

        }else{
            const json = {
                ...values
            }
            json.rating = rating
            json.movie = movieId
            console.log('Values ', json)

            addReviewApi(json)
            closeModal()

        }
    }
    return(
        <div>
            <Formik initialValues={initValues}
                    validationSchema={ReviewSchema}
                    onSubmit={(values)=>{
                        btnSubmitHandler(values)
                        closeModal()
                    }}>

                {({errors, touched}) => (
                    <Form>
                        <BForm.Group>
                            <BForm.Label htmlFor={"review"}>Review</BForm.Label>
                            <BForm.Control
                                type={"text"}
                                name={"review"}
                                as={Field}
                                invalid={errors.review}
                            >
                            </BForm.Control>
                            {errors.review && touched.review ? (<div className={styles.error}>{errors.review}</div>) : null}
                        </BForm.Group>
                        <BForm.Group>
                            <BForm.Label htmlFor={"rating"}>Rating</BForm.Label>
                            <BForm.Control
                                type={"text"}
                                name={"rating"}
                                as={ReactRating}
                                value={rating}
                                onChange={setRating}
                                style={{width:"200px"}}
                                invalid={errors.rating}
                            >
                            </BForm.Control>
                            {errors.rating && touched.rating ? (<div className={styles.error}>{errors.rating}</div>) : null}
                        </BForm.Group>
                        <BForm.Group>
                            <Button type={"submit"} className={"btn btn-primary"}>{review ? "Update":"Save"}</Button>
                        </BForm.Group>
                    </Form>
                )}
            </Formik>
        </div>
    )
}