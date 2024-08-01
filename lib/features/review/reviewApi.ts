import {Movie, moviesApiSlice} from "@/lib/features/movie/movieApi";

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
    }),
    overrideExisting: false,
})

export const { useGetAllReviewsByMovieIdQuery , useAddReviewMutation} = reviewApiSlice;