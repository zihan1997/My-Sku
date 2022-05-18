import React, {useState} from "react"
import {Header} from "antd/es/layout/layout";

// import {Table,} from "antd";
// const { Column} = Table;
// import EditProduct_Modal_Form from "./EditProduct_Modal_Form";
// import AddProductForm from './AddProduct_Form'
// import {useHistory} from "react-router-dom";
// import SearchProductForm from "./SearchProductForm";
// import {useSelector, useDispatch} from "react-redux";
import ProductsTable from "./ProductsTable";
import {useGetProductsQuery} from "../../../reducers/api/apiSlice";

export default function ProductsPage(){
    // const products = useSelector((state)=>(state.products));
    const {
        data: products,
        // isLoading,
        // isSuccess,
        // isError,
        // error
    } = useGetProductsQuery();


    return(
        <div>
            <Header
                style={{
                    background: 'inherit',
                    textAlign: 'center'
                }}
            >
                Here are Products!
                {/*<AddProductForm/>*/}
                {/*<SearchProductForm/>*/}
            </Header>

            <ProductsTable products ={products}/>
        </div>
    )
}
