import {Link} from "react-router-dom";
import React from "react";
import
{
    FileOutlined,
    HomeOutlined,
    SearchOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Layout, Menu} from "antd";
const { Sider } = Layout;
import './index.scss'

export default class MySider extends React.Component{

    render(){
        return (
            <Sider
                // trigger={null} collapsible
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
                        {
                            key: 'item 2',
                            icon: <UserOutlined />,
                            label: (<Link to='/users'>
                                        <span> User</span>
                                    </Link>),
                        },
                        {
                            key: 'item 3',
                            icon: <FileOutlined />,
                            label: (<Link to='/products'>
                                        <span> Products</span>
                                    </Link>),
                            children: [
                                {

                                    key: 'item 4',
                                    icon: <SearchOutlined />,
                                    label: (
                                        <Link to='/products/actions'>
                                            <span> Manage </span>
                                        </Link>

                                    )
                                },
                                // {
                                //     key: 'item 5',
                                //     icon: <PlusSquareOutlined />,
                                //     label: (
                                //         <Link to='/products'>
                                //             <span> <AddProductForm/></span>
                                //         </Link>)
                                // },
                                // {
                                //     key: 'item 6',
                                //     icon: <SearchOutlined />,
                                //     label: (
                                //         <Link to='/products'>
                                //             <span> <SearchProductForm/> </span>
                                //         </Link>
                                //
                                //     )
                                // }
                            ]
                        },
                    ]}
                >

                </Menu>
            </Sider>
        )
    }

}

