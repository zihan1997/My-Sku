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

        // searchProductsByCode: builder.query({
        //     query: (code)=> `/products/code/${code}`,
        //     providesTags: ['Product']
        // }),
        searchProductsByCode: builder.mutation({
            query: (code)=> ({
                url: `/products/code/${code}`,
                method: 'GET'
            }),
            providesTags: ['Product']
        }),
        searchProductsByName: builder.mutation({
            query: (name)=>({
                url: `/products/name/${name}`,
                method: 'GET'
            }),
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
    useSearchProductsByCodeMutation,
    useSearchProductsByNameMutation,
    useAddNewProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
} = apiSlice;