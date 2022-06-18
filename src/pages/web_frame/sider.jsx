import {Link} from "react-router-dom";
import React from "react";
import
{
    EditOutlined,
    HomeOutlined, TabletOutlined,
} from "@ant-design/icons";
import {Layout, Menu} from "antd";
const { Sider } = Layout;
import './index.scss'
import MyFooter from "./footer";

export default class MySider extends React.Component{

    render(){
        return (
            <Sider
                // trigger={null} collapsible
                className="Sider"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo" >My-Sku</div>
                <Menu
                    theme="dark"
                    mode="inline"
                    // defaultSelectedKeys={['0']}

                     // Nav bar Listing
                    items={[
                        {
                            key: 'item 1',
                            icon: <HomeOutlined />,
                            label: (<Link to="home">
                                        <span> Home</span>
                                    </Link>)
                        },
                        // TODO: user page implementation
                        // {
                        //     key: 'item 2',
                        //     icon: <UserOutlined />,
                        //     label: (<Link to='/users'>
                        //                 <span> User</span>
                        //             </Link>),
                        // },
                        {
                            key: 'col Product',
                            label: "Product",
                            type: 'group',
                        },
                        {
                            key: 'item 4',
                            icon: <TabletOutlined />,
                            label: (
                                <Link to='/products'>
                                    <span>Table</span>
                                </Link>
                            )
                        },
                        {

                            key: 'item 5',
                            icon: <EditOutlined />,
                            label: (
                                <Link to='/products/manage'>
                                    <span> Manage </span>
                                </Link>

                            )
                        },
                    ]}
                >

                </Menu>

                <MyFooter/>
            </Sider>
        )
    }

}

