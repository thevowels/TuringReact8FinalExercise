import {Review} from "@/lib/features/reviews/reviewApi";

import styles from "@/app/movies/movie.module.css"

export default function ReviewUI({review}: { review: Review } ) {
    return(
        <div className={styles.movieContainer}>
            {review.rating}
            &nbsp;
            {review.review}
        </div>
    )
}