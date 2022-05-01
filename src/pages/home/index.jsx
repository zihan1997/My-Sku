import React from 'react';
import {
    Link,
    BrowserRouter as Router,
    Route
} from "react-router-dom"
import { Switch } from "react-router"

import 'antd/dist/antd.css';
import './index.scss';
import { Layout, Menu} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    FileOutlined, HomeOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
import Test from './test'
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
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        >
                        {/* Nav bar Listing */}
                        <Item
                            key={this.incrementKey()}
                        >
                            <HomeOutlined />
                            {/*<Link to="/">*/}
                                <span>Home</span>
                            {/*</Link>*/}
                        </Item>
                        <Item
                            key={this.incrementKey()}
                        >
                            <UserOutlined />
                            <span>User</span>
                        </Item>
                        <Item key={this.incrementKey()}>
                            <FileOutlined />
                            <span>Product</span>
                        </Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Test />
                        {/*<Switch>*/}
                        {/*    <Route path="/">*/}
                        {/*        <Test/>*/}
                        {/*    </Route>*/}
                        {/*</Switch>*/}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}