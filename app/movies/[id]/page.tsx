"use client"
import MovieDetailUI from "@/app/components/movie/MovieDetailUI";
import {Movie} from "@/lib/features/movies/movieApi";
import {Review} from "@/lib/features/reviews/reviewApi";
import ReviewList from "@/app/components/review/ReviewList";
import ReviewInput from "@/app/components/review/ReviewInput";
import {useGetAllMoviesQuery} from "@/lib/features/movie/movieApi";

const reviews:Review[] = [
    // {
    //     "_id":"review1",
    //     "movie":"movie$",
    //     "rating":5,
    //     "review": "Good batman movie",
    //     "_v": 0
    // },
    // {
    //     "_id":"review2",
    //     "movie":"movie$",
    //     "rating":1,
    //     "review": "bad batman movie",
    //     "_v": 0
    // },

]
export default function Page({params}: {params: {id: string}}) {

    const {movie} = useGetAllMoviesQuery(undefined,{
        selectFromResult: ({data})=>({
            movie: data!.find( movie => movie._id == params.id)
        })
    })

    return(
        <div>
            Movie Details {params.id}
            <MovieDetailUI movie={movie}/>
            <ReviewInput movieId={params.id}/>
            <ReviewList movieId={params.id}/>

        </div>
    )
}