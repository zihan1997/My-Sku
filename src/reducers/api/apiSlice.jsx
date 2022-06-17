import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api',
        prepareHeaders: (headers, {getState, endpoint}) => {
            // const token = getState().auth.token;
            // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NTUzNzEwOTMsImV4cCI6MTY1NTM3MTY5M30.y_iT5g-gAZF6ei3W0vu3NwO3XegolOVPUw09O4X9eHo'
            const token = localStorage.getItem('token')
            if(token){
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Product', 'auth'],
    endpoints: builder => ({
        getProducts: builder.query({
            query: ()=>'/products',
            providesTags: ['Product']
        }),
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
                url: `/products/code/${product.code}`,
                method: 'PATCH',
                body: product
            }),
            invalidatesTags: ['Product']
        }),
        deleteProduct: builder.mutation({
            query: productCode => ({
                url: `/products/code/${productCode}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),

        getJWTToken: builder.mutation({
            query: user => ({
                url: `/login`,
                method: 'POST',
                body: user,
            }),
            providesTags: ['auth']
        }),
        register: builder.mutation({
            query: user => ({
                url: '/register',
                method: 'POST',
                body: user,
            })
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
    useGetJWTTokenMutation,
    useRegisterMutation,
} = apiSlice;