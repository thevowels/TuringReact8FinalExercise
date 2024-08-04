import React, {useEffect} from 'react';
import {usePathname, useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {selectAuth} from "@/lib/features/auth/authSlice";

function isAuth<T>(Component: React.ComponentType<T>) {

    return (props:T) =>{
        const router = useRouter();
        const auth = useSelector(selectAuth);
        let login = auth;
        const pathname = usePathname();

        console.log('Path name', pathname);
        useEffect( () =>{
            if(!login){
                router.push('/login?redirectUrl=' + pathname);
            }
        }, []);
        return(
            <>
                <Component {...props}/>
            </>
        )
    };
}

export default isAuth;