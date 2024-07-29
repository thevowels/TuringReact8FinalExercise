'use client'
import {Movie} from "@/lib/features/movies/movieApi";
import {useRouter} from "next/navigation";
import styles from "@/app/movies/movie.module.css"

export default function MovieDetailUI({movie}: {movie: Movie}) {

    const router = useRouter();
    const btnBackHandler = () => {
        router.back()
    }
    return(
        <div>
            <div className={styles.movieContainer}>
                <h3>{movie.title}</h3>
                <h3>{movie.year}</h3>
                <h3>{movie.director.name}</h3>
            </div>
            <button type={"button"} className={"btn btn-primary"} onClick={btnBackHandler}>Back</button>

        </div>
    )
}