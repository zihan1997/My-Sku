import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Form, Input, Button, Space, Modal, message} from 'antd';

import {createCode, createName, createPrice, createQuantity, createDate} from "./productGenerator";
import {productAdded, productEdited} from "./productsSlice";

export default function AddProductForm() {
    const [isFinding, setIsFinding] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [name, setName] = useState(createName());
    const [code, setCode] = useState(createCode());
    const [price, setPrice] = useState(createPrice());
    const [quantity, setQuantity] = useState(0);
    const [date, setDate] = useState(new Date().toDateString())

    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

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

    const onFetchProduct = () => {
        message
            .loading("Validating...", 0.2)
            .then(()=>{
                let existing = products.find(product => product.code === code);
                if(existing){
                    message.success('Found', 1);
                    setCorrespondingProduct(existing);
                }else{
                    message.error("Not Found", 1);
                }
            }
        )
    }

    const setCorrespondingProduct = (product) => {
        setIsFinding(true);
        setName(product.name);
        setPrice(product.price);
        setQuantity(product.quantity);
    }

    const canSave = Boolean(code)
                    && Boolean(name)
                    && Boolean(price)
                    && Boolean(quantity)
                    && Boolean(date);

    const handSubmitClick = ()=>{
        if(canSave){
            let existing = products.find((product) => product.code === code);
            if(existing){
                dispatch(productEdited({
                    key:( existing.key),
                    replace: {
                        name: existing.name,
                        quantity: + parseInt(existing.quantity) + parseInt(quantity),
                        price: existing.price
                    }
                }))
            }else
                dispatch(productAdded(code, name, price, quantity, date));
        }
        setCode(createCode());
        setName(createName());
        setPrice(createPrice());
        setQuantity(createQuantity());
        setDate(createDate());

        setIsModalVisible(false);
        setIsFinding(false);
    }

    return (
        <>
            <Button
                style={{
                    float: 'right'
                }}
                type="primary"
                onClick={showModal}
            >
                Add Product
            </Button>
            <Modal
                title="Add New Product"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Code"
                        rules={[{required: true, message: 'Please provide the code!'}]}
                    >
                        <Space>
                            <Input
                                value={code}
                                onChange={e => (setCode(e.target.value))}
                            />
                            <Button
                                type="primary"
                                onClick={()=>onFetchProduct()}
                            >
                                Find
                            </Button>
                            <button
                                onClick={generateCode}
                            >Generate
                            </button>
                        </Space>

                    </Form.Item>

                    <Form.Item
                        label="Name"
                        rules={[{required: true, message: 'Please provide a name!'}]}
                    >
                        <Space>
                            <Input
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <button
                                type='primary'
                                onClick={generateName}
                            >Generate
                            </button>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="Quantity"
                        help={isFinding?
                                <a style={{color:"green"}}>currently in stock: {quantity}</a>
                                : ""
                        }
                    >
                        <Space>
                            <Input
                                value={quantity}
                                onChange={(e) => (setQuantity(e.target.value))}
                            />
                            <button
                                type='primary'
                                onClick={generateQuantity}
                            >Generate
                            </button>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="Price"
                        // rules={[{ required: true, message: 'Please provide a name!' }]}
                    >
                        <Space>
                            <Input
                                value={price}
                                onChange={(e) => (setPrice(e.target.value))}
                            />
                            <button
                                type='primary'
                                onClick={generatePrice}
                            >Generate
                            </button>
                        </Space>
                    </Form.Item>

                    <Form.Item
                        label="Add Date"
                        // rules={[{ required: true, message: 'Please provide a name!' }]}
                    >
                        <Space>
                            <Input
                                value={date}
                                onChange={(e) => (setDate(e.target.value))}
                            />
                            <button
                                type='primary'
                                onClick={generateDate}
                            >Generate
                            </button>
                        </Space>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 10}}>
                        <Button type="primary"
                                onClick={(event) => handSubmitClick(event)}
                        >
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )
}