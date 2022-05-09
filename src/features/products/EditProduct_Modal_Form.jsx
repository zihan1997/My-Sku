import React, {useState} from "react";
import {Button, Form, Input, Modal, Space} from "antd";
import {createDate, createName, createPrice, createQuantity} from "./productGenerator";
import {productEdited} from "./productsSlice";
import {useDispatch} from "react-redux";


export default function EditProduct_Modal_Form(props){
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const product = props.record;

    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [date, setDate] = useState(product.date)

    const dispatch = useDispatch();

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

    const onProductEdit = () => {
        dispatch(productEdited(
            {
                key: product.key,
                replace: {name: name, quantity: quantity, price: price}
            }
        ));
        setIsModalVisible(false);
    }

    return (
        <>
            <a
                onClick={showModal}
            >
                Edit
            </a>
            <Modal
                title="Edit Product"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form
                    name="Edit-Form"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    initialValues={{remember: true}}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Code"
                    >
                        <Space>
                            <Input
                                value={product.code}
                            />
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
                    >
                        <Space>
                            <Input
                                value={date}
                                onChange={(e)=> (setDate(e.target.value))}
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
                                onClick={(event)=>onProductEdit(event)}
                        >
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )


}