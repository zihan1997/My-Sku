import React from "react";
import {Dropdown, Layout, Menu, message, Space, Button} from 'antd';
const { Header} = Layout;
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './index.scss'
export default function MyTopBar(props){
    return(
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
                textAlign: "right"
        }}
        >
            <Space wrap>
                {/* TODO: top user setting*/}
                {/*<Dropdown*/}
                {/*    overlay={menu}*/}
                {/*>*/}
                {/*    <Button>*/}
                {/*        <Space>*/}
                {/*            <UserOutlined />*/}
                {/*            User xxx*/}
                {/*            <DownOutlined />*/}
                {/*        </Space>*/}
                {/*    </Button>*/}
                {/*</Dropdown>*/}
            </Space>
        </Header>
    )
}

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}

const menu = (
    <Menu
        onClick={handleMenuClick}
        items={[
            {
                label: 'User Setting #1',
                key: '1',
            },
            {
                label: 'User Setting #1',
                key: '2',
            },
            {
                label: 'User Setting #1',
                key: '3',
            },
        ]}
    />
);