import React from "react"
import {Header} from "antd/es/layout/layout";
import ProductsTable from "./ProductsTable";
import {useGetProductsQuery} from "../../../reducers/api/apiSlice";

export default function ProductsPage(){
    const {
        data: products,
    } = useGetProductsQuery();


    return(
        <div>
            <Header
                style={{
                    background: 'inherit',
                    textAlign: 'center'
                }}
            >
                Products List
                {/*<AddProductForm/>*/}
                {/*<SearchProductForm/>*/}
            </Header>

            <ProductsTable products ={products}/>
        </div>
    )
}
