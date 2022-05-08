import React, {useState} from "react"
import {Table, Space, Button, Modal} from "antd";
const { Column} = Table;
import {Header} from "antd/es/layout/layout";

import {productDeleted, productEdited} from "./productsSlice";
import AddProductForm from './AddProduct'
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";


export default function ProductsPage(props){
    const [isModalVisible, setIsModalVisible] = useState(false);
    const products = useSelector((state)=>(state.products));

    const dispatch = useDispatch();
    // const history = useHistory();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log("modal closed")
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        console.log("modal canceled");
        setIsModalVisible(false);
    };

    const onProductDel = (rec)=> {
        dispatch(productDeleted({key: rec.key}));
    }

    const onProductEdit = (rec) => {
        console.log("in edit")
        dispatch(productEdited(
            {key: rec.key}
        ));
    }

    return(
        <div>
            <Header
                style={{
                    background: 'inherit',
                    textAlign: 'center'
                }}
            >
                Here are products!
                <Button
                    style={{
                        float: 'right'
                    }}
                    type="primary"
                    onClick={showModal}
                >
                    Add Product
                </Button>
                <Modal
                    title="Basic Modal"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <AddProductForm/>
                </Modal>
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
                            <a
                                // onClick={ ()=>(console.log("clicked change"))}
                                onClick={()=>onProductEdit(record)}
                            >Change</a>
                            <a
                                // onClick={ () =>console.log("delete in progress" + text.name)}
                                // onClick={ ()=>props.onDelete(record)}
                                onClick={()=>onProductDel(record)}
                            >Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </div>
    )
}
