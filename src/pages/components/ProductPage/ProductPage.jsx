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
        if(isError && error.status === 401){
            navigate('../login')
        }
    }, [error])

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
