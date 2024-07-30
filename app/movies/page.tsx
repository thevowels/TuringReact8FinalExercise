import MovieListUI from "@/app/components/movie/MovieListUI";
import NewMovieInput from "@/app/components/movie/NewMovieInput";
import {useGetAllMoviesQuery} from "@/lib/features/movie/movieApi";

export default function Page(){
    return(
        <div>
            <NewMovieInput/>
            <MovieListUI/>
        </div>
    )
}