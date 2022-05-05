import {useParams} from "react-router-dom"
import {getProduct} from "./ProductService"
import { Table, Tag, Space } from 'antd';
const { Column, ColumnGroup } = Table;

export default function Product(){
    let params = useParams();
    let product = getProduct(parseInt(params.productId, 10))
    return (
        <main sytle={{padding: "1rem"}}  >
            <h2>Total: {product.amount}</h2>
            <p>
                {product.name} : {product.number}
            </p>
            <p>Date: {product.due}</p>
        </main>
    );
}