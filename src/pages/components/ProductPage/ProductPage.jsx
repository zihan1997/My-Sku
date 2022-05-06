import React, {useState} from "react"
import {Table, Tag, Space, Button, Modal} from "antd";
const { Column, ColumnGroup } = Table;
import {Link, NavLink} from "react-router-dom";
import {Outlet} from "react-router";
import {Header} from "antd/es/layout/layout";
import AddProductForm from "./addProductForm";


export default function ProductsPage(props){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log("form ok")
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
                    <AddProductForm onCreate={props.onCreate}/>
                </Modal>
            </Header>

            <Table dataSource={props.products}>
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
                                onClick={ ()=>(console.log("clicked change"))}
                            >Change</a>
                            <a
                                // onClick={ () =>console.log("delete in progress" + text.name)}
                                onClick={ ()=>props.onDelete(record)}
                            >Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </div>
    )
}
