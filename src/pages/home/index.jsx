import React from 'react'
import Navbar from "./navbar";
import MyRouter from "../../routers/router";
import 'antd/dist/antd.css';
import './index.scss';
import {Dropdown, Layout, Menu, PageHeader} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    FileOutlined, HomeOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
import Test from './test'
import {Link} from "react-router-dom";
const {
    Item
} = Menu


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            keyCounter: 0
        };
    }
    // give unique key to each title in nav
    incrementKey = ()=>{
        console.log(this.state.keyCounter);
        return this.state.keyCounter++;
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" >My-Sku</div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        // defaultSelectedKeys={['0']}
                        >
                        {/* Nav bar Listing */}
                        <Item
                            key={this.incrementKey()}
                        >
                            <HomeOutlined />
                            <Link to="home">
                                <span> Home</span>
                            </Link>
                        </Item>
                        <Item
                            key={this.incrementKey()}
                        >
                            <UserOutlined />
                            <Link to='users'>
                                <span> User</span>
                            </Link>
                        </Item>
                        <Item key={this.incrementKey()}>
                            <FileOutlined />
                            <Link to='products'>
                                <span> Product</span>
                            </Link>
                        </Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {/*{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
                        {/*    className: 'trigger',*/}
                        {/*    onClick: this.toggle,*/}
                        {/*})}*/}

                    </Header>
                    {/*<Navbar  collapsed={true}/>*/}
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <div id="content">
                            <MyRouter/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}