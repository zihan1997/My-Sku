import React, {useState} from "react"
import {Table, Space} from "antd";
const { Column} = Table;
import {Header} from "antd/es/layout/layout";

import {productDeleted} from "../../../reducers/products/productsSlice";
import EditProduct_Modal_Form from "./EditProduct_Modal_Form";
import AddProductForm from './AddProduct_Modal_Form'
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import SearchProductForm from "./SearchProductForm";


export default function ProductsPage(){
    const products = useSelector((state)=>(state.products));

    const dispatch = useDispatch();
    // const history = useHistory();


    const onProductDel = (rec)=> {
        dispatch(productDeleted({key: rec.key}));
    }

    return(
        <div>
            <Header
                style={{
                    background: 'inherit',
                    textAlign: 'center'
                }}
            >
                Here are Products!
                <AddProductForm/>
                <SearchProductForm/>
            </Header>

            <Table dataSource={products}>
                <Column title="Code" dataIndex="code" key="code"/>
                <Column title="Name" dataIndex="name" key="name"/>
                <Column title="Price" dataIndex="price" key="price"/>
                <Column title="Quantity" dataIndex="quantity" key="quantity"/>
                <Column title="Date" dataIndex="date" key="date"/>

                <Column
                    title="Action"
                    key="action"
                    render={(text, record) => (
                        <Space size="middle">
                            <EditProduct_Modal_Form
                                record={record}
                            />
                            <a
                                onClick={()=>onProductDel(record)}
                            >Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </div>
    )
}
