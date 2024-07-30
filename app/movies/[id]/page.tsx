import MovieDetailUI from "@/app/components/movie/MovieDetailUI";
import {Movie} from "@/lib/features/movies/movieApi";
import {Review} from "@/lib/features/reviews/reviewApi";
import ReviewList from "@/app/components/review/ReviewList";
import ReviewInput from "@/app/components/review/ReviewInput";

const movie:Movie =     {
    "_id":"movie1",
    "title":"Dark Knight",
    "director":{
        "name": "Christopher Nolan",
        "phoneNo":"091234",
        "_id":"director1"
    },
    "year": 2005,
    "_v" : 0
}
const reviews:Review[] = [
    {
        "_id":"review1",
        "movie":"movie$",
        "rating":5,
        "review": "Good batman movie",
        "_v": 0
    },
    {
        "_id":"review2",
        "movie":"movie$",
        "rating":1,
        "review": "bad batman movie",
        "_v": 0
    },

]
export default function Page({params}: {params: {id: string}}) {

    return(
        <div>
            Movie Details {params.id}
            <MovieDetailUI movie={movie}/>
            <ReviewInput/>
            <ReviewList reviews={reviews}/>

        </div>
    )
}