"use client"

import {Movie} from "@/lib/features/movie/movieApi";
import MovieUI from "@/app/components/movie/MovieUI";
import {useGetAllMoviesQuery} from "@/lib/features/movie/movieApi";

export default function MovieListUI() {
    const {data, isError, isLoading, isSuccess, refetch} = useGetAllMoviesQuery(undefined,{

    });
    console.log('data ', data);
    if(isLoading){
        return(<div>
            Loading ...
        </div>)
    }
    if(isError){
        return(
            <div>Error</div>
        )
    }
    if(isSuccess) {
        return (
            <div>
                {data.map((movie: Movie) => {
                    return (<MovieUI key={movie._id} movie={movie}/>)
                })}
            </div>
        )
    }
}