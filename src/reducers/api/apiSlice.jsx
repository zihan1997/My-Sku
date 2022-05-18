import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api',
    }),
    tagTypes: ['Product'],
    endpoints: builder => ({
        getProducts: builder.query({
            query: ()=>'/products',
            providesTags: ['Product']
        }),
        addNewProduct: builder.mutation({
            query: initialProduct => ({
                url: '/products',
                method: 'POST',
                body: initialProduct
            }),
            invalidatesTags: ['Product']
        }),
        editProduct: builder.mutation({
            query: product => ({
                url: `/products/${product.key}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: productKey => ({
                url: `/products/${productKey}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        })
    })
})

export const {
    useGetProductsQuery,
    useAddNewProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
} = apiSlice;