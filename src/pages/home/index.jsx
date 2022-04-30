import React from 'react';
import {
    Layout
} from 'antd';
import Navbar from './Navbar';
import Sidebar from './sidebar';

export default class Home extends React.Component {
    state = {
        collapsed: false,
        superLevel: true
    }

    handleLogout = () => {
        // this.props.signout()
        console.log("sign out")
    }

    toggleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render() {
        const superLevel = this.state.superLevel

        return (
            <div className="HomePage">
                <Layout>
                    <Sidebar collapsed={this.state.collapsed} permission={superLevel}/>
                </Layout>
            </div>
        )
    }
}