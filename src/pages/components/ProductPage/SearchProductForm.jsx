import React, {useEffect, useState} from "react";
import {Button, Divider, Input, Modal, Select, Space, message, Steps} from 'antd';
import {useSelector} from "react-redux";
import CodeReader from "./BarCodeReader/CodeReader";
import * as PropTypes from "prop-types";
import ProductsTable from "./ProductsTable";
import {nanoid} from "@reduxjs/toolkit";
const { Option } = Select;
const {Step} = Steps;

Step.propTypes = {title: PropTypes.bool};
export default function SearchProductForm(){


    const products = useSelector(state => state.products);
    const [productsList, setProductsList] = useState(products);

    const [option, setOption] = useState();
    const [optVal, setOptVal] = useState();
    const [isCamera, setIsCamera] = useState(false);

    useEffect(()=> {
        setProductsList(products.slice(0, 10))
    }, [products])

    function onSelect(value) {
        console.log(`selected ${value} ${optVal}`);
        setOption(value);
    }

    // Find Button
    function onFindProduct(){
        let productsTemp = [], product = {};

        if(!option) {
            message.error("Provide search index", 1)
            return;
        }
        switch (option) {
            case "code":
                setIsCamera(true);
                product = products.find(one => one.code === optVal);
                if(product) productsTemp.push(product)
                break;
            case "name":
                let p = products.filter(one => (one.name).includes(optVal));
                if(p) productsTemp = p;
                break;
        }
        // if()
        giveTotal(productsTemp);
        setProductsList(productsTemp)
    }

    const giveTotal = (productsTemp) => {
        let total = {code: "None", name: <strong>Total</strong>}

        let price = 0, quantity = 0;
        for(let product of productsTemp){
            price += product.price;
            quantity += product.quantity;
        }
        total["key"] = nanoid();
        total["price"] = <strong>{price}</strong>;
        total["quantity"] = <strong>{quantity}</strong>
        total["date"] = <strong>-</strong>

        productsTemp.push(total);
    }

    const onDetect = (result)=>{
        // console.log("---result : " + result)
        setOptVal(result);
    }

    const onReset = ()=>{
        setProductsList(products);

    }

    return (
        <Space direction="vertical">
            <Space>
                <Divider/>
            </Space>
            <Space
                // style={{marginLeft: 50}}
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
                <Button
                    type="primary"
                    onClick={()=>(setProductsList(products))}
                >Reset</Button>
            </Space>

            {/* code reader comment out for now */}

            {/*{(option === "code")?*/}
            {/*    (*/}
            {/*        <>*/}
            {/*            <Divider/>*/}
            {/*                <CodeReader onDetectCode={onDetect}/>*/}
            {/*            <Divider/>*/}
            {/*        </>*/}
            {/*    ):<Divider/>*/}
            {/*}*/}

            <ProductsTable products={productsList}/>
        </Space>
    );
}