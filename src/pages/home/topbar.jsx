import React from "react";
import {Dropdown, Layout, Menu, message, Space, Button, Tooltip} from 'antd';
const { Header} = Layout;
import { DownOutlined, UserOutlined } from '@ant-design/icons';

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
                <Dropdown
                    overlay={menu}
                >
                    <Button>
                        <Space>
                            User xxx
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Space>
        </Header>
    )
}

function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
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
                icon: <UserOutlined />,
            },
            {
                label: 'User Setting #1',
                key: '2',
                icon: <UserOutlined />,
            },
            {
                label: 'User Setting #1',
                key: '3',
                icon: <UserOutlined />,
            },
        ]}
    />
);