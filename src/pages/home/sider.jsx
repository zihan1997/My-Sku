import {Link} from "react-router-dom";
import React from "react";
import
{
    FileOutlined,
    HomeOutlined,
    UserOutlined
} from "@ant-design/icons";
import {Layout, Menu} from "antd";
const { Sider } = Layout;
const {
    Item
} = Menu
import './index.scss'

export default class MySider extends React.Component{
    render(){
        return (
            <Sider
                trigger={null} collapsible
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
                >
                    {/* Nav bar Listing */}
                    <Item
                        key={this.props.incrementKey()}
                    >
                        <HomeOutlined />
                        <Link to="home">
                            <span> Home</span>
                        </Link>
                    </Item>
                    <Item
                        key={this.props.incrementKey()}
                    >
                        <UserOutlined />
                        <Link to='users'>
                            <span> User</span>
                        </Link>
                    </Item>
                    <Item key={this.props.incrementKey()}>
                        <FileOutlined />
                        <Link to='products'>
                            <span> Product</span>
                        </Link>
                    </Item>
                </Menu>
            </Sider>
        )
    }

}