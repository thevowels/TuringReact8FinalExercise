'use client'
import {Movie} from "@/lib/features/movies/movieApi";
import {useRouter} from "next/navigation";
import styles from "@/app/movies/movie.module.css"
import {useState} from "react";
import {Modal} from "react-bootstrap";
import MovieForm from "@/app/components/movie/MovieForm";

export default function MovieDetailUI({movie}: {movie: Movie}) {

    const [show, setShow] = useState<boolean>(false);
    const handleClose = ()=> setShow(false);
    const handleShow = ()=> setShow(true);


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
                <button type={"button"} className={"btn btn-primary"} onClick={handleShow}>Edit</button>
            </div>
            <button type={"button"} className={"btn btn-primary"} onClick={btnBackHandler}>Back</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    Editing Movie
                </Modal.Header>
                <Modal.Body>
                    <MovieForm movieToEdit={movie} closeModal={handleClose}/>
                </Modal.Body>
            </Modal>
        </div>
    )
}