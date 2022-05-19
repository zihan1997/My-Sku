import React from "react";
import {useNavigate} from "react-router-dom";
import {PageHeader, Tabs, Button,} from 'antd';
import SearchProductForm from "./actions/SearchProductForm";
import AddProductForm from "./actions/AddProduct_Form";
// import EditProduct_Modal_Form from "./actions/EditProduct_Modal_Form";
const { TabPane } = Tabs;

export default function ProductController(){


    const navigate = useNavigate();
    return(
        <PageHeader
            className="product-action-header"
            onBack={() => navigate("../products")}
            title="Management"
            subTitle="This is a subtitle"

            extra={[
                <Button key="3">Operation</Button>,
                <Button key="2">Operation</Button>,
                <Button key="1" type="primary">
                    Primary
                </Button>,
            ]}
            footer={
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Search" key="1" >
                        <SearchProductForm/>
                    </TabPane>
                    <TabPane tab="Add" key="2" >
                        <AddProductForm/>
                    </TabPane>
                </Tabs>
            }
        >
            {/*<Content extra={extraContent}>{renderContent()}</Content>*/}
        </PageHeader>
    )
}