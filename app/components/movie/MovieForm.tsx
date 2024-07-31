import {Field, Form, Formik} from "formik";
import {Button, Form as BForm} from "react-bootstrap";
import styles from "@/app/movies/movie.module.css";
import * as Yup from "yup";
import {Director, Movie, useUpdateMovieMutation} from "@/lib/features/movie/movieApi";
import {useAddMovieMutation} from "@/lib/features/movie/movieApi";

const MovieSchema = Yup.object().shape({
    title: Yup.string().required()
        .min(2,'Too Short')
        .max(20,'Too Long')
        .required('Required'),
    year: Yup.string()
        .required('Required'),
    name:Yup.string()
        .min(2,'Too Short')
        .max(50, 'Too Long')
        .required('Required'),
    phoneNo:Yup.string()
        .required('Required'),
})

function createUpdateMovieJSON(movieToEdit: Movie, values) {
    const movieToUpdate = {
        ...movieToEdit,
        title: values.title,
        year: values.year,
        director: {
            ...movieToEdit.director,
            name: values.name,
            phoneNo: values.phoneNo,
        }
    }
    return movieToUpdate;
}

function createNewMovieJSON(values) {
    const director: Partial<Director> = {
        name: values.name,
        phoneNo: values.phoneNo,
    }
    const newMovie: Partial<Movie> = {
        title: values.title,
        year: values.year,
        director: director,
    }
    return newMovie;
}

export default function MovieForm({movieToEdit, closeModal}:{
                                            movieToEdit:Movie,
                                            closeModal: ()=>void}) {

    const [addMovieApi, addMovieApiResult] = useAddMovieMutation();
    const [updateMovieApi, updateMovieApiResult] = useUpdateMovieMutation();


    const initValues = {
        title:"",
        year:0,
        name:"",
        phoneNo:"",
    }
    if(movieToEdit){
        initValues.title=movieToEdit.title
        initValues.year = movieToEdit.year
        initValues.name = movieToEdit.director.name
        initValues.phoneNo= movieToEdit.director.phoneNo

    }

    const submitHandler=(values)=>{

        if(movieToEdit){
            const movieToUpdate = createUpdateMovieJSON(movieToEdit, values);
            console.log('updating ', movieToUpdate)
            updateMovieApi(movieToUpdate)
                .unwrap()
                .then(data =>{
                    console.log("update Movie Success", data)
                    closeModal();
                })


        }else{
            const newMovie = createNewMovieJSON(values);
            console.log('save movie : ', newMovie);
            addMovieApi(newMovie)
                .unwrap()
                .then(data => {
                    console.log("add Movie Success ", data)
                    closeModal()
                })
        }

    }

    return <Formik
        initialValues={initValues }
        validationSchema={MovieSchema}
        onSubmit={values => {
            submitHandler(values);
            closeModal();
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
                    <Button type={"submit"} className={"btn btn-primary"}>{movieToEdit ? "Update":"Save"}</Button>
                </BForm.Group>
            </Form>
        )}
    </Formik>;
}