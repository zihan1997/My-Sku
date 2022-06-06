import React from "react";
import {Footer} from "antd/es/layout/layout";

export default class MyFooter extends React.Component{

    render(){
        return (
            <Footer
                style={{
                    background: "inherit",
                    textAlign: 'center',
                    fontSize: "small",
                    color: "rgb(255, 255, 255, 0.3)",
                    // block
                }}
            >
                My-Sku ©2022 Created by ZH
            </Footer>
        );
    }
}