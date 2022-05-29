import { configureStore} from "@reduxjs/toolkit";

// import productsReducer from "../reducers/products/productsSlice";
import {apiSlice} from "../reducers/api/apiSlice";
import {setupListeners} from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        // products: productsReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})
setupListeners((store.dispatch))
export default store;