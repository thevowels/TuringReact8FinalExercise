"use client"
import {Review} from "@/lib/features/reviews/reviewApi";
import ReviewUI from "@/app/components/review/ReviewUI";
import {useRouter} from "next/navigation";

export default function ReviewList({reviews}: {reviews: Review[]}) {

    const router = useRouter();
    const btnBackHandler = () => {
        router.back()
    }

    return(
        <div>
            {reviews.map((review: Review) => {
                return <ReviewUI key={review._id} review={review}/>
            })}

            <button type={"button"} className={"btn btn-primary"} onClick={btnBackHandler}>Back</button>

        </div>
    )
}