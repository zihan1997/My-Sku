import React, {useState} from "react"
import {Table, Space} from "antd";
const { Column} = Table;
import {Header} from "antd/es/layout/layout";

// import EditProduct_Modal_Form from "./EditProduct_Modal_Form";
// import AddProductForm from './AddProduct_Form'
// import {useHistory} from "react-router-dom";
// import SearchProductForm from "./SearchProductForm";
import {useSelector, useDispatch} from "react-redux";
import ProductsTable from "./ProductsTable";


export default function ProductsPage(){
    const products = useSelector((state)=>(state.products));

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
