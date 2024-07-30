"use client"

import {Review} from "@/lib/features/reviews/reviewApi";
import styles from "@/app/movies/movie.module.css"
import {useState} from "react";
import { Rating as ReactRating } from '@smastrom/react-rating'


export default function ReviewUI({review}: { review: Review } ) {
    // const [rating, setRating] = useState(0)
    return(
        <div className={styles.movieContainer}>
            <ReactRating style={{ maxWidth: 100 }} value={review.rating} readOnly />
            &nbsp;
            {review.review}
        </div>
    )
}