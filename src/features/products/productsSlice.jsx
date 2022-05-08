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
                        key: nanoid(),
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
            const {key} = action.payload;
            return state.filter((product) => (product.key !== key))
        },
        productEdited(state, action){
            const {key, replace} = action.payload;
            const existingProduct = state.find((product)=>(product.key === key));
            if(existingProduct){
                for(let arr in replace){
                    console.log("---" + arr);
                }
            }
        }
    }
});

export const {productAdded, productDeleted, productEdited} = productsSlice.actions;
export default productsSlice.reducer;