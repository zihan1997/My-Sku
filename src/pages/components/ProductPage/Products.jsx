import React from "react"
import {  Table, Tag, Space  } from "antd";
const { Column, ColumnGroup } = Table;
import {Link, NavLink} from "react-router-dom";
import {Outlet} from "react-router";


export default function ProductsPage(props){
    return(
        <div>
            <h1
                style={{textAlign: "center"}}
            >
                Here are products!
            </h1>

            <Table dataSource={props.products}>
                <Column title="Name" dataIndex="name" key="name"/>
                <Column title="Code" dataIndex="code" key="code"/>
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
