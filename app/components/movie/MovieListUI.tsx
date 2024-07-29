"use client"

import {Movie} from "@/lib/features/movies/movieApi";
import MovieUI from "@/app/components/movie/MovieUI";

export default function MovieListUI(props:{movies:Movie[]}   ) {
    return(
        <div>
            {props.movies.map((movie:Movie) => {return (<MovieUI key={movie._id} movie={movie}/>)})}
        </div>
    )
}