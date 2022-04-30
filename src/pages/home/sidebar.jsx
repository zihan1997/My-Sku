import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
    Layout,
    Badge,
    Menu
} from 'antd'
import {
    DashboardOutlined,
    ProfileOutlined,
    SolutionOutlined,
    SwitcherOutlined,
    TableOutlined,
    TagsOutlined,
    UserOutlined
} from "@ant-design/icons";
// import SidebarLogo from './src/components/SidebarLogo';
import '../../assets/scss/pages/home/sidebar.scss'

const {
    Sider
} = Layout;
const {
    Item,
    SubMenu
} = Menu

// @connect(
//     state => ({
//         adminId: state.auth.admin.adminId,
//         wait: state.orders.wait,
//         dispatching: state.orders.dispatching,
//         refunding: state.orders.refunding
//     })
// )
export default class Sidebar extends React.Component {
    static propTypes = {
        collapsed: PropTypes.bool.isRequired,
        permission: PropTypes.bool.isRequired
    }

    state = {
        current: '0'
    }

    handleClick = (e) => {
        const key = e.key
        this.setState({
            current: key
        })
    }

    render() {
        const {
            adminId,
            permission,
            wait,
            dispatching,
            refunding,
            collapsed
        } = this.props

        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                {/*<SidebarLogo />*/}
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["0"]}
                    onClick={this.handleClick}
                >
                    <Item key="0">
                        {/*<Link to="/dashboard">*/}
                            <DashboardOutlined/>
                            <span>dashboard</span>
                        {/*</Link>*/}
                    </Item>
                    <Item key="1">
                        {/*<Link to="users">*/}
                            <UserOutlined/>
                            <span>用户信息管理</span>
                        {/*</Link>*/}
                    </Item>
                    <Item key="2">
                        {/*<Link to="/goods">*/}
                            <TableOutlined/>
                            <span>商品信息管理</span>
                        {/*</Link>*/}
                    </Item>
                    <SubMenu title={<span><TagsOutlined/>商品分类管理</span>}>
                        <Item key="3">
                            {/*<Link to="/category/first">*/}
                                <span>一级分类</span>
                            {/*</Link>*/}
                        </Item>
                        <Item key="4">
                            {/*<Link to="/category/second">*/}
                                <span>二级分类</span>
                            {/*</Link>*/}
                        </Item>
                    </SubMenu>
                    <SubMenu title={<span><ProfileOutlined/>订单信息管理</span>}>
                        <Item key="5">
                            {/*<Link to="/orders">*/}
                                <span>订单查询</span>
                            {/*</Link>*/}
                        </Item>
                        <Item key="6">
                            <Badge count={wait + dispatching}>
                                {/*<Link to="/order/dispatch">*/}
                                    <span>订单配送&nbsp;&nbsp;</span>
                                {/*</Link>*/}
                            </Badge>
                        </Item>
                        <Item key="7">
                            <Badge count={refunding}>
                                {/*<Link to="/order/refund">*/}
                                    <span>退款处理&nbsp;&nbsp;</span>
                                {/*</Link>*/}
                            </Badge>
                        </Item>
                    </SubMenu>
                    <Item key="8">
                        {/*<Link to="/advertisments">*/}
                            <SwitcherOutlined/>
                            <span>滑动广告管理</span>
                        {/*</Link>*/}
                    </Item>
                </Menu>
            </Sider>
        )
    }
}