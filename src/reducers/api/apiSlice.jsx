import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api',
        prepareHeaders: (headers, getState, forced) => {
            forced = true;
            console.log(getState)
            if(getState.endpoint === 'getJWTToken' || getState.endpoint === 'register'){
                return headers;
            }
            const token = localStorage.getItem('token');
            console.log("get token")
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
            }),
            invalidatesTags: ['auth']
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