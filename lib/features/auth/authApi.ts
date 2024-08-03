import { moviesApiSlice} from "@/lib/features/movie/movieApi";

export interface AuthRequest{
    userName: string;
    password: string;
}

export interface AuthResponse {
    token:string;
}


const authApi = moviesApiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<AuthResponse,AuthRequest>({
            query: (authRequest: AuthRequest) => ({
                url: '/users/login',
                method: 'POST',
                body: authRequest,
            }),
            invalidatesTags:['Movies', 'Reviews','Auth'],
        })
    }),
    overrideExisting: false,
})

export const { useLoginMutation } = authApi;
