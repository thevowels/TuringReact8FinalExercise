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
    tagTypes: ["Movies"],
    endpoints: (build) => ({
        // Supply generics for the return type (in this case `QuotesApiResponse`)
        // and the expected query argument. If there is no argument, use `void`
        // for the argument type instead.
        getAllMovies: build.query<Movie[],undefined>({
            query: () => `/movies`,
            // providesTags: ["Movies"],
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ _id }) => ({ type: 'Movies' as const, id:_id })), 'Movies']
                    : ['Movies'],

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
            async onQueryStarted(movie:Movie, {dispatch,queryFulfilled}){
                console.log('onQueryStarted update Movie', movie);
                const patchResult = dispatch(
                    moviesApiSlice.util.updateQueryData('getAllMovies', undefined, (draft)=>{
                        console.log('draft ', draft)
                        draft = draft.map(mv => mv._id != movie._id ? mv: movie)
                        return draft;
                    })
                )
                try{
                    const{data:updatedMovie} = await queryFulfilled
                    console.log('updated Movie', updatedMovie)
                }catch(error){
                    console.log('error ', error);
                    patchResult.undo()
                }
            },
            invalidatesTags: (result,error,arg) =>[{'type':'Movies',id:arg._id}]

        }),
        deleteMovie: build.mutation<Movie,String>({
            query: (id: String) =>({
                url: `/movies/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(id:string, {dispatch,queryFulfilled}){
                console.log('onQueryStarted delete Todo', id);
                const patchResult = dispatch(
                    moviesApiSlice.util.updateQueryData('getAllMovies', undefined, (draft)=>{
                        console.log('draft ', draft)
                        draft = draft.filter(mv => mv._id != id)
                        return draft;
                    })
                )
                try{
                    const{data:deletedMovie} = await queryFulfilled
                    console.log('Deleted Movie', deletedMovie)
                }catch(error){
                    console.log('error ', error);
                    patchResult.undo()
                }
            }
        })


    }),
});

export const { useGetAllMoviesQuery, useAddMovieMutation, useUpdateMovieMutation, useDeleteMovieMutation } = moviesApiSlice;
