"use client"
import MovieListUI from "@/app/components/movie/MovieListUI";
import NewMovieInput from "@/app/components/movie/NewMovieInput";
import IsAuth from "@/app/components/Auth/IsAuth";


function MoviePage(){
    return(
        <div>
            <NewMovieInput/>
            <MovieListUI/>
        </div>
    )
}

export default IsAuth(MoviePage)