import {createSlice, nanoid} from "@reduxjs/toolkit";
import { sub } from 'date-fns'

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
        date: "Thu Aug 20 2020",
        name: "Refined Wooden Chair",
        price: 465.68,
        quantity: 223,
    }
]

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productAdded: {
            reducer(state, action){
                state.push(action.payload)
            },
            prepare(code, name, price, quantity, date){
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        code,
                        price,
                        quantity,
                        date,
                        // date: new Date().toISOString(),
                    }
                }
            }
        },
        productDeleted(state, action){
            state = state.filter((product) => product !== action.payload)
        }
    }
});

export const {productAdded, productDeleted} = productsSlice.actions;
export default productsSlice.reducer;