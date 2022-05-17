import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api',
    }),
    endpoints: builder => ({
        getProducts: builder.query({
            query: ()=>'/products'
        })
    })
})

export const {useGetProductsQuery} = apiSlice;