import MovieListUI from "@/app/components/movie/MovieListUI";
import {Movie} from "@/lib/features/movies/movieApi";
import NewMovieInput from "@/app/components/movie/NewMovieInput";

const movies: Movie[] = [
    {
        "_id":"movie1",
        "title":"Dark Knight",
        "director":{
            "name": "Christopher Nolan",
            "phoneNo":"091234",
            "_id":"director1"
        },
        "description":"The plot follows the vigilante Batman, police lieutenant James Gordon, and district attorney Harvey Dent, who form an alliance to dismantle organized crime in Gotham City. Their efforts are derailed by the Joker, an anarchistic mastermind who seeks to test how far Batman will go to save the city from chaos.",
        "year": 2005,
        "_v": 0,
    },
    {
        "_id":"movie2",
        "title":"Avartar",
        "director":{
            "name": "James Cameron",
            "phoneNo":"0998766",
            "_id":"director2"
        },
        "description":"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home. A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.\n",
        "year": 2005,
        "_v": 0,
    }

]
export default function Page(){
    return(
        <div>
            <NewMovieInput/>
            <MovieListUI movies={movies}/>
        </div>
    )
}