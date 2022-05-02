import React from 'react'
import Navbar from "./navbar";
import MyRouter from "../../routers/router";
import 'antd/dist/antd.css';
import './index.scss';
import {Dropdown, Layout, Menu, PageHeader} from 'antd';
import {
    UserOutlined,
    FileOutlined, HomeOutlined, MenuUnfoldOutlined, MenuFoldOutlined,
} from '@ant-design/icons';
import MySider from "./sider";
const { Header, Sider, Content } = Layout;
import Test from './test'
import {Link} from "react-router-dom";



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
                <MySider
                    incrementKey={this.incrementKey}
                    collapsed = {this.state.collapsed}
                />
                <Layout
                    className="site-layout"
                    style={{
                        marginLeft: 200,
                    }}
                >
                    <Header className="site-layout-background" style={{ padding: 0 }}>

                    </Header>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 10px 0',
                            paddingLeft: 24,
                            // padding: 24,
                            minHeight: 280,
                            overflow: 'initial'
                        }}
                    >
                        <div
                            id="content"
                            style={{
                                fontSize: 20,
                                padding: 24,
                            }}
                        >
                            {/*<Test/>*/}
                            <MyRouter/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}