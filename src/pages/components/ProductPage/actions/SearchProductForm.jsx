import React, {useEffect, useState} from "react";
import {Button, Divider, Input, Select, Space, message, Steps} from 'antd';
import CodeReader from "../BarCodeReader/CodeReader";
import {
    useGetProductsQuery,
    useSearchProductsByCodeMutation,
    useSearchProductsByNameMutation
} from "../../../../reducers/api/apiSlice";
import * as PropTypes from "prop-types";
import ProductsTable from "../ProductsTable";
import {nanoid} from "@reduxjs/toolkit";
const { Option } = Select;
const {Step} = Steps;

Step.propTypes = {title: PropTypes.bool};
export default function SearchProductForm(){

    const {data: products} = useGetProductsQuery();
    const [getCode] = useSearchProductsByCodeMutation();
    const [getName] = useSearchProductsByNameMutation();

    // search options: code, name
    const [option, setOption] = useState();
    // search input
    const [searchedVal, setSearchedVal] = useState();
    // generate table with searched option
    const [searchOutputTable, setSearchOutputTable] = useState();
    // camera settings
    const [isCamera, setIsCamera] = useState(false);

    useEffect(()=> {
        setSearchOutputTable(products)
    }, [products])

    function onSelect(value) {
        // console.log(`selected ${value} ${searchedVal}`);
        setOption(value);
    }

    // reset the table
    const onReset = ()=>{
        setSearchOutputTable([]);
    }

    // Find Button
    const onFindProduct = async () => {
        let productsTemp = [], product = {};

        if(!option) {
            message.error("Provide search index", 1)
            return;
        }
        switch (option) {
            case "code":
                setIsCamera(true);
                if(!parseInt(searchedVal)){
                    message.error("Invalid code! code should be numbers", 1);
                    return;
                }
                product = await getCode(searchedVal).unwrap();
                if(product) productsTemp.push(product[0])
                break;
            case "name":
                let getNamePromise = await getName(searchedVal).unwrap();
                productsTemp = productsTemp.concat(getNamePromise);
                break;
        }
        if(productsTemp && productsTemp[0]) {
            giveTotal(productsTemp);
            setSearchOutputTable(productsTemp)
        }else{
            message.error('Not found', 1);
            setSearchOutputTable([])
        }
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
        total["date"] = <strong>{new Date().toISOString()}</strong>

        productsTemp.push(total);
    }

    const onDetect = (result)=>{
        // console.log("---result : " + result)
        setSearchedVal(result);
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
                    value={searchedVal}
                    onChange={e=> setSearchedVal(e.target.value.trim())}
                />
                <Button
                    type="primary"
                    onClick={()=>onFindProduct()}
                >Find</Button>
                <Button
                    type="primary"
                    onClick={()=>(setSearchOutputTable([]))}
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

            <ProductsTable products={searchOutputTable}/>
        </Space>
    );
}