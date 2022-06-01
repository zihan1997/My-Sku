import React from 'react'
import MyTopBar from "./topbar";
import 'antd/dist/antd.css';
import './index.scss';
import MySider from "./sider";
import { Layout} from 'antd';
import MyContent from "./content";


export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            keyCounter: 0
        };
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
                    collapsed = {this.state.collapsed}
                />
                <Layout
                    className="site-layout"
                    style={{
                        marginLeft: 200,
                    }}
                >
                    {/* TODO: top user setting*/}
                    {/*<MyTopBar />*/}
                    <MyContent/>
                </Layout>
            </Layout>
        );
    }
}