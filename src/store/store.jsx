import { configureStore} from "@reduxjs/toolkit";

import productsReducer from "../reducers/products/productsSlice";
import {apiSlice} from "../reducers/api/apiSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store;