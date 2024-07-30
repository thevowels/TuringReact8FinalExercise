import {Field, Form, Formik} from "formik";
import {Button, Form as BForm} from "react-bootstrap";
import styles from "@/app/movies/movie.module.css";
import * as Yup from "yup";

const MovieSchema = Yup.object().shape({
    title: Yup.string().required()
        .min(2,'Too Short')
        .max(20,'Too Long')
        .required('Required'),
    year: Yup.string()
        .required('Required'),
    name:Yup.string()
        .min(2,'Too Short')
        .max(20, 'Too Long')
        .required('Required'),
    phoneNo:Yup.string()
        .required('Required'),
})

export default function MovieForm() {
    const initValues = {
        title:"",
        year:"",
        name:"",
        phoneNo:"",
    }

    return <Formik
        initialValues={initValues}
        validationSchema={MovieSchema}
        onSubmit={values => {
            console.log(values);
        }}>
        {({errors, touched}) => (
            <Form>
                <BForm.Group>
                    <BForm.Label htmlFor={"title"}>Title</BForm.Label>
                    <BForm.Control
                        type={"text"}
                        name={"title"}
                        as={Field}
                        invalid={errors.title}
                    >
                    </BForm.Control>
                    {errors.title && touched.title ? (<div className={styles.error}>{errors.title}</div>) : null}
                </BForm.Group>
                <BForm.Group>
                    <BForm.Label htmlFor={"year"}>Year</BForm.Label>
                    <BForm.Control
                        type={"text"}
                        name={"year"}
                        as={Field}
                        invalid={errors.year}
                    >
                    </BForm.Control>
                    {errors.year && touched.year ? (<div className={styles.error}>{errors.year}</div>) : null}
                </BForm.Group>
                <BForm.Group>
                    <BForm.Label htmlFor={"name"}>Name</BForm.Label>
                    <BForm.Control
                        type={"text"}
                        name={"name"}
                        as={Field}
                        invalid={errors.name}
                    >
                    </BForm.Control>
                    {errors.name && touched.name ? (<div className={styles.error}>{errors.name}</div>) : null}
                </BForm.Group>
                <BForm.Group>
                    <BForm.Label htmlFor={"phoneNo"}>Phone No:</BForm.Label>
                    <BForm.Control
                        type={"text"}
                        name={"phoneNo"}
                        as={Field}
                        invalid={errors.phoneNo}
                    >
                    </BForm.Control>
                    {errors.phoneNo && touched.phoneNo ? (<div className={styles.error}>{errors.phoneNo}</div>) : null}
                </BForm.Group>
                <BForm.Group>
                    <Button type={"submit"} className={"btn btn-primary"}>Save</Button>
                </BForm.Group>
            </Form>
        )}
    </Formik>;
}