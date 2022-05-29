import React from "react";
import {Layout} from "antd";
import MyRouter from "../../routers/router";
const { Content } = Layout;

export default function MyContent() {
    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 10px 0',
                paddingLeft: 24,
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
    )
}