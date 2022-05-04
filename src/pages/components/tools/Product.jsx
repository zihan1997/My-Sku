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


const dataSource = [
    {
        name: "Santa Monica",
        number: 1995,
        amount: "$10,800",
        due: "12/05/1995",
    },
    {
        name: "Stankonia",
        number: 2000,
        amount: "$8,000",
        due: "10/31/2000",
    },
    {
        name: "Ocean Avenue",
        number: 2003,
        amount: "$9,500",
        due: "07/22/2003",
    },
    {
        name: "Tubthumper",
        number: 1997,
        amount: "$14,000",
        due: "09/01/1997",
    },
    {
        name: "Wide Open Spaces",
        number: 1998,
        amount: "$4,600",
        due: "01/27/1998",
    },
]