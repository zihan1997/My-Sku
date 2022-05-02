import React from "react"
import { Link } from "react-router-dom";
import {Outlet} from "react-router";
import {getProducts} from "./tools/ProductService";

export default function ProductsPage(){
    let products = getProducts();
    return(
        <div>
            <h1>Here are products!</h1>
            <nav>
                {products.map((product) => (
                    <Link
                        to={`/products/${product.number}`}
                        key={product.number}
                    >
                        {product.name}<br/>
                    </Link>
                ))}
            </nav>
            <Outlet/>
        </div>
    )
}
