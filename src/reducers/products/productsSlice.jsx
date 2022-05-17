import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import axios from 'axios';
// import { sub } from 'date-fns'

const initialState = [
    {
        key: nanoid(),
        code: "2993-487-2542",
        date: "Tue Apr 20 2021",
        name: "Incredible Bronze Cheese",
        price: 277.04,
        quantity: 157,
    },
    {
        key: nanoid(),
        code: "8159-186-2492",
        name: "Refined Wooden Chair",
        price: 465.68,
        quantity: 223,
        date: "Thu Aug 20 2020",
    },
    {
        key: nanoid(),
        code: "1",
        name: "1",
        price: 1,
        quantity: 3,
        date: "Thu Aug 20 2021",
    },
    {
        key: nanoid(),
        code: "6901668005755",
        name: "Cookies(real)",
        price: 10,
        quantity: 3,
        date: "Wed May 11 2022",
    }
]

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productAdded: {
            reducer(state, action){
                console.log("product added")
                state.push(action.payload)
            },
            prepare(code, name, price, quantity, date){
                return {
                    payload: {
                        key: nanoid(),
                        name,
                        code,
                        price,
                        quantity,
                        date,
                    }
                }
            }
        },
        productDeleted(state, action){
            const {key} = action.payload;
            return state.filter((product) => (product.key !== key))
        },
        productEdited(state, action){
            const {key, replace} = action.payload;
            const existingProduct = state.find((product)=>(product.key === key));
            if(existingProduct){
                existingProduct.name = replace.name;
                existingProduct.quantity = replace.quantity;
                existingProduct.price = replace.price;
                existingProduct.date = new Date().toDateString();
            }
        }
    }
});

export const {productAdded, productDeleted, productEdited} = productsSlice.actions;
export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products.products;

export const selectProducts = (state, key) => state.products.products.find((product) => product.key === key)