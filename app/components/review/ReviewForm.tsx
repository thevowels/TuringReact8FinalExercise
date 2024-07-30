"use client"
import {Field, Form, Formik} from "formik";
import {Button, Form as BForm} from "react-bootstrap";
import styles from "@/app/movies/movie.module.css";
import * as Yup from "yup";
import {Review} from "@/lib/features/review/reviewApi";
import {useState} from "react";
import { Rating as ReactRating } from '@smastrom/react-rating'

const ReviewSchema = Yup.object().shape({
    review: Yup.string().required()
        .min(2,'Too Short')
        .max(20,'Too Long')
        .required('Required'),
    rating: Yup.number()
        .required('Required'),
})
const initValues = {
    review: "loreum",
    rating: 2,
}
export default function ReviewForm({review}: {review: Review}) {
    const [rating, setRating] = useState(initValues.rating)

    return(
        <div>
            <Formik initialValues={initValues}
                    validationSchema={ReviewSchema}
                    onSubmit={(values)=>{
                        values.rating = rating
                        console.log('Review = ',values)
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