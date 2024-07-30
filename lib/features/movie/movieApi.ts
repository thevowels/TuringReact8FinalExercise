import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Director{
    "name": string,
    "phoneNo": string,
    "_id": string,
}

export interface Movie{
    "_id": string,
    "title": string,
    "director": Director,
    "year":number,
    "_v": number
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log('backend url', BACKEND_URL);

export const moviesApiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BACKEND_URL }),
    reducerPath: "moviesApi",
    // Tag types are used for caching and invalidation.
    tagTypes: ["Movie"],
    endpoints: (build) => ({
        // Supply generics for the return type (in this case `QuotesApiResponse`)
        // and the expected query argument. If there is no argument, use `void`
        // for the argument type instead.
        getAllMovies: build.query<Movie[],undefined>({
            query: () => `/movies`,
            providesTags: ["Movies"]
            // providesTags: (result, error, arg) =>
            //     result
            //         ? [...result.map(({ _id }) => ({ type: 'Todos' as const, id:_id })), 'Todos']
            //         : ['Todos'],

            // `providesTags` determines which 'tag' is attached to the
            // cached data returned by the query.
            // providesTags: (result, error, id) => [{ type: "Quotes", id }],
        }),
        addMovie: build.mutation<Movie, Partial<Movie> >({
            query: (movie: Partial<Movie>) =>({
                url: '/movies',
                method: 'POST',
                body: movie,
            }),
            // invalidatesTags:["Todos"]

            async onQueryStarted(movie: Movie,{dispatch,queryFulfilled} ){
                console.log('onQueryStarted ', movie);

                try{
                    const {data:savedMovie} = await queryFulfilled
                    console.log('Saved saveTodo', savedMovie)
                    const patchResult = dispatch(
                        moviesApiSlice.util.updateQueryData('getAllMovies',undefined, (draft)=>{
                            draft.push(savedMovie)
                            return draft
                        })
                    )
                }catch(error){
                    console.log('error ', error)

                }
            }

        }),
        updateMovie: build.mutation<Movie,Movie>({
            query: (movie: Movie) =>({
                url: `/movies/${movie._id}`,
                method: 'PUT',
                body: movie,
            }),
            invalidatesTags: (result,error,arg) =>[{'type':'Todos',id:arg._id}]

        })


    }),
});

export const { useGetAllMoviesQuery, useAddMovieMutation } = moviesApiSlice;
