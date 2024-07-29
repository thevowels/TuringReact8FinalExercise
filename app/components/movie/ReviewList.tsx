import {Review} from "@/lib/features/reviews/reviewApi";
import ReviewUI from "@/app/components/movie/ReviewUI";

export default function ReviewList({reviews}: {reviews: Review[]}) {
    return(
        <div>
            Review List {reviews.length}
            {reviews.map((review: Review) => {return <ReviewUI key={review._id} review={review}/>})}
        </div>
    )
}