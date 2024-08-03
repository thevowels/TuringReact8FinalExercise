import {Movie, moviesApiSlice} from "@/lib/features/movie/movieApi";
import {BaseQueryMeta, BaseQueryResult} from "@reduxjs/toolkit/src/query/baseQueryTypes";

export interface Review{
    "_id": string,
    "movie": string,
    "rating": number,
    "review": string,
    "_v": number
}

const reviewApiSlice = moviesApiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllReviewsByMovieId: build.query<Review[],string>({
            query: (movieId: string) => `/reviews/movie/${movieId}`,
            transformResponse : (reviews: any[], meta, arg) =>{
                return reviews.map(review => {
                    review.movie = review.movie._id
                    return review;
                })
            }
            // providesTags: (result, error, arg) =>
            //     result
            //         ? [...result.map(({ _id }) => ({ type: 'Reviews' as const, id:_id })), 'Reviews']
            //         : ['Reviews'],
            //
        }),
        addReview: build.mutation<Review, Partial<Review> >({
            query: (review: Partial<Review>) =>({
                url: '/reviews/',
                method: 'POST',
                body: review,
            }),
            // invalidatesTags:["Todos"]

            async onQueryStarted(review: Review,{dispatch,queryFulfilled} ){
                console.log('onQueryStarted ', review);
                try{
                    const {data:savedReview} = await queryFulfilled
                    console.log('Saved Review', savedReview)
                    const patchResult = dispatch(
                        reviewApiSlice.util.updateQueryData('getAllReviewsByMovieId',review.movie, (draft)=>{
                            draft.push(savedReview)
                            return draft
                        })
                    )
                }catch(error){
                    console.log('error ', error)

                }
            }

        }),
        updateReview: build.mutation<Review,Review>({
            query: (review: Review) =>({
                url: `/reviews/${review._id}`,
                method: 'PUT',
                body: review,
            }),
            async onQueryStarted(review:Review, {dispatch,queryFulfilled}){
                console.log('onQueryStarted update Review', review);
                const patchResult = dispatch(
                    reviewApiSlice.util.updateQueryData('getAllReviewsByMovieId', review.movie, (draft)=>{
                        console.log('draft ', draft)
                        draft = draft.map(rv => rv._id != review._id ? rv: review)
                        return draft;
                    })
                )
                try{
                    const{data:updatedReview} = await queryFulfilled
                    console.log('updated Review', updatedReview)
                }catch(error){
                    console.log('error ', error);
                    patchResult.undo()
                }
            },
            invalidatesTags: (result,error,arg) =>[{'type':'Movies',id:arg._id}]

        }),
        deleteReview: build.mutation<Review,Review>({
            query: (review: Review) =>({
                url: `/reviews/${review._id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(review:Review, {dispatch,queryFulfilled}){
                console.log('onQueryStarted delete Review', review);
                const patchResult = dispatch(
                    reviewApiSlice.util.updateQueryData('getAllReviewsByMovieId', review.movie, (draft)=>{
                        console.log('draft ', draft)
                        draft = draft.filter(rev => rev._id != review._id)
                        return draft;
                    })
                )
                try{
                    const{data:deletedReview} = await queryFulfilled
                    console.log('Deleted Review', deletedReview)
                }catch(error){
                    console.log('error ', error);
                    patchResult.undo()
                }
            }
        })

    }),
    overrideExisting: false,
})

export const { useGetAllReviewsByMovieIdQuery , useAddReviewMutation, useUpdateReviewMutation, useDeleteReviewMutation} = reviewApiSlice;