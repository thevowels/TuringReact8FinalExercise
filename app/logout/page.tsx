"use client"
import {useDispatch} from "react-redux";
import {logout} from "@/lib/features/auth/authSlice";
import {moviesApiSlice} from "@/lib/features/movie/movieApi";

export default function LogoutPage() {
    const dispatch = useDispatch();
    const btnLogoutHandler = (e) => {
        console.log("Logout");
        dispatch(logout())
        dispatch(moviesApiSlice.util.resetApiState())
    }
    return(
        <div>
            <button type={"button"}
                    className={"btn btn-primary"}
                    onClick={btnLogoutHandler}>
                Logout
            </button>
        </div>
    )
}