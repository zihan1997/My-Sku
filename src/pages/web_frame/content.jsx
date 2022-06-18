import React from "react";
import {Layout} from "antd";
const { Content } = Layout;

import {Route} from "react-router-dom";
import {Routes} from "react-router";
import WelcomePage from "../components/HomePage/WelcomePage";
import ProductsPage from "../components/ProductPage/ProductPage";
import ProductController from "../components/ProductPage/ProductController";
import UsersPage from "../components/UserPage/UsersPage";

export default function MyContent() {

    const routes = (
        <Routes>
            <Route path="/home" exact element={<WelcomePage/>} />
            <Route path="/products" element={<ProductsPage/>}/>
            <Route path="/products/manage" element={<ProductController/>}/>
            <Route path="/users" element={<UsersPage/>} />
            {/*<Route path='*' element={<WelcomePage/>}/>*/}
        </Routes>
    )
    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 10px 0',
                paddingLeft: 24,
                minHeight: 600,
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

                {routes}
                {/*<MyRouter/>*/}
            </div>
        </Content>
    )
}