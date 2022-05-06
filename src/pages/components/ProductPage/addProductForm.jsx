import React, {useState} from "react";
import { Form, Input, Button, Checkbox } from 'antd';

export default function AddProductForm(props){

    const [name, setName] = useState();
    const [code, setCode] = useState();
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (e) => {
        console.log('Failed:', e);
    };

    function getName(event){
        console.log(`${event.target.value}`);
        setName(event.target.value);
    }

    function getCode(event){
        console.log(`${event.target.value}`);
        setCode(event.target.value);
    }
    //
    function submit(){
        let product = {};
        product.name = name;
        product.code = code;
        props.onCreate(product)
    }

    // button press for submitting
    function handClick(event) {
        console.log("form submitting")
        submit(event);
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            onSubmit={()=>submit}
        >
            <Form.Item
                label="Code"
                name="code"
                rules={[{ required: true, message: 'Please provide the code!' }]}
            >
                <Input onChange={getCode}/>
            </Form.Item>

            <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please provide a name!' }]}
            >
                <Input onChange={getName}/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary"
                    onClick={(event)=>handClick(event)}
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );

}