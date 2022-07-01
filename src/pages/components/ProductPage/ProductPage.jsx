import React, {useEffect} from "react"
import {Header} from "antd/es/layout/layout";
import ProductsTable from "./ProductsTable";
import {useGetProductsQuery} from "../../../reducers/api/apiSlice";
import {useNavigate} from "react-router-dom";

export default function ProductsPage(){
    const {
        data: products,
        error,
        isError
    } = useGetProductsQuery();

    const navigate = useNavigate();

    useEffect(() => {
        console.log("here")
        if(error && error.status === 401){
            console.log(error)
            console.log("here 1")
            navigate('../login', {replace: true})
        }
    }, [isError])

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
