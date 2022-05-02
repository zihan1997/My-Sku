import React from 'react'
import PropTypes from 'prop-types';
import {Menu, Layout} from "antd";
const {Header} = Layout;


export default class Navbar extends React.Component{
    static propTypes ={
        collapsed: PropTypes.bool.isRequired,
        handleClick: PropTypes.bool.isRequired,
    }
    handleSignOut(){
        return console.log;
    }
    renderOverlay(){
        return (
            <Menu onClick={this.handleSignOut("sign out")}
            >
                <Menu.Item>
                    Sign Out
                </Menu.Item>
            </Menu>
        )
    }

    render() {
        const menu = this.renderOverlay();
        return (
            <Header>
                <nav className="navbar">
                    <ul className="nav">
                        <li className="nav-item">
                            <Icon
                                className="sidebar-trigger"
                                type={this.props.collapsed ? 'menu-unfold': 'menu-fold'}
                                onClick={this.props.toggle}
                            />
                        </li>
                    </ul>
                    <ul className="nav navbar-right">
                        <Dropdown
                            overlay={menu}
                        >
                            <li className="nav-item">
                                <Icon
                                    type="user"
                                />
                            </li>
                        </Dropdown>
                    </ul>
                </nav>
            </Header>
        )
    }
}