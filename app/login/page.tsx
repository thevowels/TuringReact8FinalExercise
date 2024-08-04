"use client"
import * as Yup from "yup";
import {Field, Form, Formik} from "formik";
import {Button, Form as BForm} from "react-bootstrap";
import {useLoginMutation} from "@/lib/features/auth/authApi";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {login, selectAuth} from "@/lib/features/auth/authSlice";
import {useSelector} from "react-redux";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect} from "react";

const UserSchema = Yup.object().shape({
    userName: Yup.string()
        .required()
        .min(2,'Too Short')
        .max(20,'Too Long'),
    password: Yup.string()
        .required('Required')
})

export default function Page(){
    const dispatch = useAppDispatch();
    const auth = useSelector(selectAuth)

    const [ loginApi, loginApiResponse] = useLoginMutation();

    const searchParams = useSearchParams();

    const router = useRouter();
    const redirectUrl = searchParams.get("redirectUrl");

    useEffect(() => {
        console.log('Auth ', auth, 'redirect URL ',redirectUrl);
        if(auth)
        {
            if(redirectUrl)
            {
                router.push(redirectUrl);
            }
            else
            {
                router.push('/');
            }
        }
    })

    let initialValues = {
        userName: "",
        password: "",
    }



    function loginHandler(values) {
        loginApi(values)
            .unwrap()
            .then(data => {
                console.log('Login success ',data)
                dispatch(login(data))
            },error=>{
                console.log('login failed', error)
            })
    }

    return(
        <div>
            Login Page
            <Formik
                initialValues={initialValues}
                validationSchema={UserSchema}
                onSubmit={values =>{
                    loginHandler(values);

            }}>
                {({errors, touched}) => (
                    <Form>
                        <BForm.Group>
                            <BForm.Label htmlFor={"userName"}>Username</BForm.Label>
                            <Field
                                type={"text"}
                                name={"userName"}
                                as={BForm.Control}
                                />
                            {errors.userName && touched.userName ? (<div className={"alert alert-danger"}>{errors.userName}</div>):null}
                        </BForm.Group>
                        <BForm.Group>
                            <BForm.Label htmlFor={"password"}>Password</BForm.Label>
                            <Field
                                type={"password"}
                                name={"password"}
                                as={BForm.Control}
                                />
                            {errors.password && touched.password ? (<div className={"alert alert-danger"}>{errors.password}</div>):null}

                        </BForm.Group>
                        <BForm.Group>
                            <button type={"submit"} className={"btn btn-outline-primary"}>Submit</button>
                        </BForm.Group>
                    </Form>
                )}
            </Formik>
        </div>
    )
}