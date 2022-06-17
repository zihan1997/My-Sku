import React from "react";
import {Table, Space, message} from "antd";
const { Column} = Table;
import EditProduct_Modal_Form from "./actions/EditProduct_Modal_Form";
import {useDeleteProductMutation} from "../../../reducers/api/apiSlice";

export default function ProductsTable(props){
    const products = props.products;

    const [deleteProductById] = useDeleteProductMutation();

    const onProductDel = async (rec)=> {
        if(rec.code === "None"){
            message.error("This is Total sum, CANNOT DELETE!");
            return;
        }
        console.log("code: " + rec.code)
        await deleteProductById(rec.code)
    }

    return (
        <Table dataSource={products} rowKey="_id">
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
    )
}