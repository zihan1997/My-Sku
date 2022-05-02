import React from "react"
import {Link, NavLink} from "react-router-dom";
import {Outlet} from "react-router";
import {getProducts} from "./tools/ProductService";

export default function ProductsPage(){
    let products = getProducts();
    return(
        <div>
            <h1>Here are products!</h1>
            <nav>
                {products.map((product) => (
                    <NavLink
                        style={({isActive}) => {
                            return {
                                display: "block",
                                margin: "1rem 0",
                                color: isActive? "green": "gray",
                            }
                        }}
                        to={`/products/${product.number}`}
                        key={product.number}
                    >
                        {product.name}
                    </NavLink>
                ))}
            </nav>
            <Outlet/>
        </div>
    )
}
