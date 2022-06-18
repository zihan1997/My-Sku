import React from "react";
import {Dropdown, Layout, Menu, Space, Button} from 'antd';
const { Header} = Layout;
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import './index.scss'
import {useNavigate} from "react-router-dom";
export default function MyTopBar(){

    const navigate = useNavigate();

    function handleMenuClick(e) {
        switch (e.key){
            case '1':
                console.log('click logout');
                localStorage.clear();
                navigate('../login');
                break;
        }
    }

    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: 'Log out',
                    key: '1',
                },
                // {
                //     label: 'User Setting #1',
                //     key: '2',
                // },
                // {
                //     label: 'User Setting #1',
                //     key: '3',
                // },
            ]}
        />
    );

    return(
        <Header
            className="site-layout-background"
            style={{
                padding: 0,
                textAlign: "right",
        }}
        >
            <Space wrap>
                {/* TODO: top user setting*/}
                <Dropdown
                    overlay={menu}
                >
                    <Button>
                        <Space>
                            <UserOutlined />
                                <strong>{localStorage.getItem('user')}</strong>
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </Space>
        </Header>
    )
}

