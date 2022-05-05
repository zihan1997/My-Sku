import React from "react";
import CreateData from './ProductsDB';


export function ProductGetter(){
    let products = CreateData(10);
    return (
        <ul>
            {
                products.map((product, i) => {
                    return <div>{
                        <li>{product.name + " " + product.code}</li>
                    }</div>
                })
            }
        </ul>
    )
}
export function Setter() {

}