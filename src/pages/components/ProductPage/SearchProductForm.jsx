import React, {useEffect, useState} from "react";
import {Button, Divider, Descriptions, Input, Modal, Select, Space, message} from 'antd';
import {useSelector} from "react-redux";
import CodeReader from "./BarCodeReader/CodeReader";
const { Option } = Select;

export default function SearchProductForm(){

    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // console.log("modal closed")
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        // console.log("modal canceled");
        setIsModalVisible(false);
    };

    const products = useSelector(state => state.products);
    const [code, setCode] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();
    const [date, setDate] = useState();

    const [option, setOption] = useState();
    const [optVal, setOptVal] = useState();
    const [isCamera, setIsCamera] = useState(false);

    function onSelect(value) {
        console.log(`selected ${value} ${optVal}`);
        setOption(value);
    }

    // Find Button
    function onFindProduct(){
        let res, product = {};

        if(!option) {
            message.error("Provide search index", 1)
            return;
        }
        switch (option) {
            case "code":
                res = "code";
                setIsCamera(true);
                product = products.find(one => one.code === optVal)
                break;
            case "name":
                res = "name";
                product = products.find(one => one.name === optVal)
                break;
        }

        message
            .loading("Finding...", 0.7)
            .then(()=>{
                if(product) {
                    message.success('Found', 1);
                    setCode(product.code);
                    setName(product.name);
                    setPrice(product.price);
                    setQuantity(product.quantity);
                    setDate(product.date);
                }else{
                    message.error("No such product", 1);
                    setCode('');
                    setName('');
                    setPrice('');
                    setQuantity('');
                    setDate('');
                }
            })

    }

    const onDetect = (result)=>{
        // console.log("---result : " + result)
        setOptVal(result);
    }


    return (
        <>
            <Button
                style={{
                    padding: 0,
                    float: 'left',
                    backgroundColor: 'inherit',
                    border: 'inherit',
                    color: 'white'
                }}
                onClick={showModal}
            >
                Search
            </Button>
            <Modal
                title="Search Product"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Space
                    style={{marginLeft: 50}}
                >
                    <Select
                        // showSearch
                        placeholder="_____"
                        optionFilterProp="children"
                        onChange={onSelect}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="code">Code</Option>
                        <Option value="name">Name</Option>
                    </Select>
                    <Input
                        value={optVal}
                        onChange={e=> setOptVal(e.target.value.trim())}
                    />
                    <Button
                        type="primary"
                        onClick={()=>onFindProduct()}
                    >Find</Button>
                </Space>

                <Space direction="horizontal"></Space>

                {(option === "code")?
                    (
                        <>
                            <Divider/>
                                <CodeReader onDetectCode={onDetect}/>
                            <Divider/>
                        </>
                    ):<Divider/>
                }


                <Descriptions
                    labelStyle={{
                        padding: 10
                    }}
                    contentStyle={{
                        marginLeft: 200,
                        paddingLeft: 50
                    }}
                    column={1}
                    bordered
                >
                    <Descriptions.Item label="code">
                        {code}
                    </Descriptions.Item>
                    <Descriptions.Item label="name">
                        {name}
                    </Descriptions.Item>
                    <Descriptions.Item label="price">
                        {price}
                    </Descriptions.Item>
                    <Descriptions.Item label="quantity">
                        {quantity}
                    </Descriptions.Item>
                    <Descriptions.Item label="date">
                        {date}
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
}