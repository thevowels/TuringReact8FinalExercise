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
    "description":"The plot follows the vigilante Batman, police lieutenant James Gordon, and district attorney Harvey Dent, who form an alliance to dismantle organized crime in Gotham City. Their efforts are derailed by the Joker, an anarchistic mastermind who seeks to test how far Batman will go to save the city from chaos.",
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