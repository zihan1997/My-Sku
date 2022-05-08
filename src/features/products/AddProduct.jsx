import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Form, Input, Button, Space} from 'antd';
import {faker} from "@faker-js/faker";

import {createCode, createName, createPrice, createQuantity, createDate} from "./productGenerator";
import {productAdded} from "./productsSlice";

export default function AddProductForm() {
    const [name, setName] = useState(createName());
    const [code, setCode] = useState(createCode());
    const [price, setPrice] = useState(createPrice());
    const [quantity, setQuantity] = useState(0);
    const [date, setDate] = useState(new Date().toDateString())

    const dispath = useDispatch();
    const products = useSelector((state)=>state.prodcuts);


    const onNameChange = (e)=>setName(e.target.value);
    const OnCodeSet = () => setCode(createCode());
    const onPriceChange = (e) => setPrice(e.target.value);
    const onQuantityChange = (e) => setQuantity(e.target.value);


    const generateCode = () => {
        setCode(createCode());
    }
    const generateName = () => {
      setName(createName());
    }

    const generateQuantity = ()=>{
        setQuantity(createQuantity());
    }

    const generatePrice = ()=> {
        setPrice(createPrice());
    }

    const generateDate = () => {
        setDate(createDate());
    }

    const canSave = Boolean(code)
                    && Boolean(name)
                    && Boolean(price)
                    && Boolean(quantity)
                    && Boolean(date);

    const handSubmitClick = (event)=>{
        if(canSave){
            dispath(productAdded(code, name, price, quantity, date))
        }
        setCode('');
        setName('');
        setPrice(0);
        setQuantity(0);
        setDate('');
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            <Form.Item
                label="Code"
                rules={[{ required: true, message: 'Please provide the code!' }]}
            >
                <Space>
                    <Input
                        value={code}
                        onChange={ e=> (setCode(e.target.value))}
                    />
                    <button
                        type='primary'
                        onClick={generateCode}
                    >Generate</button>
                </Space>

            </Form.Item>

            <Form.Item
                label="Name"
                rules={[{ required: true, message: 'Please provide a name!' }]}
            >
                <Space>
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <button
                        type='primary'
                        onClick={generateName}
                    >Generate</button>
                </Space>
            </Form.Item>

            <Form.Item
                label="Quantity"
                // rules={[{ required: true, message: 'Please provide a name!' }]}
            >
                <Space>
                    <Input
                        value={quantity}
                        onChange={(e)=> (setQuantity(e.target.value))}
                    />
                    <button
                        type='primary'
                        onClick={generateQuantity}
                    >Generate</button>
                </Space>
            </Form.Item>

            <Form.Item
                label="Price"
                // rules={[{ required: true, message: 'Please provide a name!' }]}
            >
                <Space>
                    <Input
                        value={price}
                        onChange={(e)=> (setPrice(e.target.value))}
                    />
                    <button
                        type='primary'
                        onClick={generatePrice}
                    >Generate</button>
                </Space>
            </Form.Item>

            <Form.Item
                label="Add Date"
                // rules={[{ required: true, message: 'Please provide a name!' }]}
            >
                <Space>
                    <Input
                        value={date}
                        onChange={(e)=> (setDate(e.target.value))}
                    />
                    <button
                        type='primary'
                        onClick={generateDate}
                    >Generate</button>
                </Space>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                <Button type="primary"
                        onClick={(event)=>handSubmitClick(event)}
                >
                    Submit
                </Button>
            </Form.Item>

        </Form>
    );
}