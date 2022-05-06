import React, {useState} from "react";
import { Form, Input, Button } from 'antd';

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
    function submit(auto=false){
        let product = {};
        if(auto){
            product = props.onAutoFill()
        }else{
            product.name = name;
            product.code = code;
        }
        props.onCreate(product);

    }

    // button press for submitting
    function handSubmitClick(event) {
        console.log("form submitting")
        submit(event);
    }

    function handleAutoFillClick(){
        submit(true);
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
                rules={[{ required: true, message: 'Please provide the code!' }]}
            >
                <Input onChange={getCode}/>
            </Form.Item>

            <Form.Item
                label="Name"
                rules={[{ required: true, message: 'Please provide a name!' }]}
            >
                <Input onChange={getName}/>
            </Form.Item>

            <Form.Item
                label="Quantity"
                // rules={[{ required: true, message: 'Please provide a name!' }]}
            >
                Quantity done auto
            </Form.Item>

            <Form.Item
                label="Price"
                // rules={[{ required: true, message: 'Please provide a name!' }]}
            >
                Price done auto
            </Form.Item>

            <Form.Item
                label="Add Date"
                // rules={[{ required: true, message: 'Please provide a name!' }]}
            >
                Date done auto
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                <Button type="primary"
                    onClick={(event)=>handSubmitClick(event)}
                >
                    Submit
                </Button>
                <Button type="default"
                        onClick={(event)=>handleAutoFillClick(event)}
                >
                    Auto Fill Data
                </Button>
            </Form.Item>

        </Form>
    );

}