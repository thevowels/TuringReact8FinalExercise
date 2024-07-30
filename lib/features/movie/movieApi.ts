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
    "description": string,
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
            // providesTags: ["Movies"]
            // providesTags: (result, error, arg) =>
            //     result
            //         ? [...result.map(({ _id }) => ({ type: 'Todos' as const, id:_id })), 'Todos']
            //         : ['Todos'],

            // `providesTags` determines which 'tag' is attached to the
            // cached data returned by the query.
            // providesTags: (result, error, id) => [{ type: "Quotes", id }],
        }),
        // addTodo: build.mutation<Todo, Partial<Todo> >({
        //     query: (todo: Partial<Todo>) =>({
        //         url: '/todos',
        //         method: 'Post',
        //         body: todo,
        //     }),
        //     // invalidatesTags:["Todos"]
        //
        //     async onQueryStarted(todo: Todo,{dispatch,queryFulfilled} ){
        //         console.log('onQueryStarted ', todo);
        //
        //         try{
        //             const {data:savedTodo} = await queryFulfilled
        //             console.log('Saved saveTodo', savedTodo)
        //             const patchResult = dispatch(
        //                 todosApiSlice.util.updateQueryData('getAllTodos',undefined, (draft)=>{
        //                     draft.push(savedTodo)
        //                     return draft
        //                 })
        //             )
        //         }catch(error){
        //             console.log('error ', error)
        //
        //         }
        //     }
        //
        // }),


    }),
});

export const { useGetAllMoviesQuery } = moviesApiSlice;
