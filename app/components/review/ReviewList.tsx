"use client"
import {Review} from "@/lib/features/reviews/reviewApi";
import ReviewUI from "@/app/components/review/ReviewUI";
import {useRouter} from "next/navigation";
import {useGetAllReviewsByMovieIdQuery} from "@/lib/features/review/reviewApi";

export default function ReviewList({movieId}: {movieId: string}) {

    const router = useRouter();
    const btnBackHandler = () => {
        router.back()
    }
    const {data: reviews, isError, isLoading, isSuccess, refetch } = useGetAllReviewsByMovieIdQuery(movieId);
    if(isError){
        return(<div>Error</div>)
    }
    if(isLoading){
        return(<div> Loading ... </div>)
    }
    if(isSuccess){
        console.log('useGetAllReviewsByMovieIdQuery ', reviews)
        return(
            <div>
                {reviews!.map((review: Review) => {
                    return <ReviewUI key={review._id} review={review}/>
                })}
            </div>
        )
    }

    return(

        <div>
            {/*{data!.map((review: Review) => {*/}
            {/*    return <ReviewUI key={review._id} review={review}/>*/}
            {/*})}*/}

            <button type={"button"} className={"btn btn-primary"} onClick={btnBackHandler}>Back</button>

        </div>
    )
}