"use client"

import {Movie} from "@/lib/features/movies/movieApi";
import Image from "next/image";
import styles from "../../movies/movie.module.css"
import "@/app/movies/movie.module.css"
import {useRouter} from "next/navigation";
export default function MovieUI({movie}:{movie:Movie}) {
    const router= useRouter();
    const btnDetailHandler = ()=>{
        router.push(`/movies/${movie._id}`);
    }
    return(
        <div className={styles.movieContainer}>
            Title: {movie.title}
            &nbsp;
            <button type={"button"} className={"btn btn-primary"} onClick={btnDetailHandler}>Details</button>
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