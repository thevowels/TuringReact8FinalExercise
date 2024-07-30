"use client"

import {Movie} from "@/lib/features/movies/movieApi";
import Image from "next/image";
import styles from "../../movies/movie.module.css"
import "@/app/movies/movie.module.css"
import {useRouter} from "next/navigation";
import ConfirmModel from "@/app/components/common/ConfirmModel";
import {useState} from "react";
export default function MovieUI({movie}:{movie:Movie}) {
    const router= useRouter();
    const [showConfirm, setShowConfirm] = useState(false);
    const btnDetailHandler = ()=>{
        router.push(`/movies/${movie._id}`);
    }
    const btnDeleteHandler = () => {
        setShowConfirm(true)
    }
    const handleClose = ()=> {
        setShowConfirm(false);
    }
    const handleYes = ()=>{
        console.log('Delete Yes')
        handleClose();
    }
    const handleNo = ()=>{
        console.log('No');
        handleClose();
    }
    return(
        <div className={styles.movieContainer}>
            Title: {movie.title}
            <ConfirmModel
                show={showConfirm}
                handleClose={handleClose}
                render = {()=>{
                    return(
                    <div>
                        <h1> Are you sure you want to Delete?</h1>
                        <button type={"button"}
                                className={"btn btn-danger"}
                                onClick={handleYes}>Yes</button>
                        &nbsp;
                        <button type={"button"}
                                className={"btn btn-warning"}
                                onClick={handleNo}>No</button>
                    </div>
                    )
                }}
            />
            &nbsp;
            <button type={"button"} className={"btn btn-primary"} onClick={btnDetailHandler}>Details</button>
            &nbsp;
            <button type={"button"} className={"btn btn-danger"} onClick={btnDeleteHandler}>Delete</button>
        </div>
    )
}

// export default function MovieUI({movie}:{movie:Movie}) {
//     return(
//         <div className="card" style={{width: "18rem"}}>
//             <Image className="card-img-top" src={require("@/app/src/download.jpeg")} alt="Card image cap"/>
//             <div className="card-body">
//                 <h5 className="card-title ">{movie.title}</h5>
//                 <p className="card-text text-truncate">{movie.description}
//                 </p>
//                 <a href="#" className="btn btn-primary">Details</a>
//             </div>
//         </div>
//
//     )
// }