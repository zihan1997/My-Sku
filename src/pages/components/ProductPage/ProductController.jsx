import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {PageHeader, Tabs, Button, Statistic, Descriptions, Divider} from 'antd';
import SearchProductForm from "./SearchProductForm";
import AddProductForm from "./AddProduct_Modal_Form";
import EditProduct_Modal_Form from "./EditProduct_Modal_Form";
const { TabPane } = Tabs;

const routes = [
    {
        path: '/',
        breadcrumbName: 'Home'
    },
    {
        path: 'products',
        breadcrumbName: 'products'
    },
    {
        path: 'actions',
        breadcrumbName: 'actions'
    }
]

export default function ProductController(){

    const navigate = useNavigate();
    // useEffect(()=> {
    //
    //     // return navigate('/products')
    // }, []);

    return(
        <PageHeader
            className="product-action-header"
            onBack={() => navigate("../products")}
            title="Title"
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