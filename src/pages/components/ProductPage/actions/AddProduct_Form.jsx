import React, {useState} from "react";
import {Button, Divider, Form, Input, message, Space, DatePicker} from 'antd';
import {ScanOutlined} from "@ant-design/icons";
import {createCode, createDate, createName, createPrice, createQuantity} from "../productGenerator";
import {useNavigate} from "react-router-dom";
import {
    useAddNewProductMutation,
    useEditProductMutation,
    useGetProductsQuery,
    useSearchProductsByCodeMutation
} from "../../../../reducers/api/apiSlice";

export default function AddProductForm() {
    const [isFinding,  setIsFinding] = useState(false);
    const [name, setName] = useState(createName());
    const [code, setCode] = useState(createCode());
    const [price, setPrice] = useState(createPrice());
    const [quantity, setQuantity] = useState(1);
    const [date, setDate] = useState(new Date().toISOString());
    const [isScan, setIsScan] = useState(false);

    const {data: products} = useGetProductsQuery();
    const [addProduct] = useAddNewProductMutation();
    const [getCode] = useSearchProductsByCodeMutation();
    const [editProduct] = useEditProductMutation();
    const [getProductByCode] = useSearchProductsByCodeMutation();

    const navigate = useNavigate();


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
    // const generateDate = () => {
    //     setDate(createDate());
    // }

    const onFetchProduct = () => {
        message
            .loading("Validating...", 1)
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

    const handSubmitClick = async ()=>{
        console.log("submit")
        if(canSave){
            let existing = await getProductByCode(code).unwrap();
            if(existing.length){
                setIsFinding(true);
                await editProduct({
                    key: existing.key,
                    code: existing.code,
                    name: existing.name,
                    quantity: + parseInt(existing.quantity) + parseInt(quantity),
                    price: existing.price,
                    date: new Date().toISOString(),
                })
            }else {
                await addProduct({
                    code: code,
                    name: name,
                    quantity: parseInt(quantity),
                    price: price,
                    date: date
                }).unwrap()
            }

            navigate("../products")
        }
        setCode(createCode());
        setName(createName());
        setPrice(createPrice());
        setQuantity(createQuantity());
        setDate(createDate());

        setIsFinding(false);
    }

    const getExistingProductQuantity = async ()=> {
        return (await getProductByCode(code)).quantity;
    }

    const onDetect = (result)=>{
        // console.log("---result : " + result)
        setCode(result)
    }

    return (

        <Space direction="vertical">

            <Space>
                <Divider/>
            </Space>
                <Form
                    name="basic"
                    labelCol={{span: 7}}
                    wrapperCol={{span: 200}}
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
                            <button
                                onClick={generateCode}
                            >Generate
                            </button>

                        </Space>

                        <div>
                            <Button
                                type="primary"
                                shape={<ScanOutlined/>}
                                onClick={()=>setIsScan(true)}
                            >Scan
                            </Button>

                            <Button
                                // type="primary"
                                onClick={()=>onFetchProduct()}
                            >
                                Find
                            </Button>
                        </div>

                    </Form.Item>

                    {/* code reader comment out for now*/}

                    {/*{isScan ?*/}
                    {/*    (*/}
                    {/*        <>*/}
                    {/*        <Divider/>*/}
                    {/*            <CodeReader onDetectCode={onDetect}/>*/}
                    {/*        <Divider/>*/}
                    {/*        </>*/}
                    {/*    ): ""*/}
                    {/*}*/}


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
                                <a style={{color:"green"}}>currently in stock: {
                                    // todo find a way to replace this,
                                    //  currently meet a error of too many re-render
                                    products.find(product => product.code === code).quantity
                                }</a>
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
                            <DatePicker
                                format="YYYY-MM-DD"
                                onChange = {(date, dateString) => setDate(dateString)}
                            />
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
        </Space>
    )
}