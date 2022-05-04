import React from 'react'
import MyTopBar from "./topbar";
import 'antd/dist/antd.css';
import './index.scss';
import MySider from "./sider";
import {Layout} from 'antd';
// const { Header, Sider, Content } = Layout;
// import Test from './test'
// import {Link} from "react-router-dom";
import MyContent from "./content";


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
                    <MyTopBar />

                    <MyContent/>

                </Layout>
            </Layout>
        );
    }
}