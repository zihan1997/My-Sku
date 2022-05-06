import React, {useEffect, useState} from "react";
import {faker} from "@faker-js/faker"
import ProductsPage from "./ProductPage";
// Attributes
// "name", "code", "price", "quantity", "date"
// ####-###-### 4-3-4
export default function ProductsDB(){
    const [products, setProducts] =
        useState( JSON.parse(window.localStorage.getItem('products')) || createProducts());

    useEffect(()=>{
        setProducts(JSON.parse(window.localStorage.getItem('products')));
    }, [])

    useEffect(()=>{
        console.log("data changed")
        window.localStorage.setItem('products', JSON.stringify(products))
    }, [products]);

    function createOne(){
        let product = {};
        product.name = faker.commerce.productName();
        product.code = faker.datatype.number({
            min: 1000,
            max: 9999
        })+ "-" + faker.datatype.number({
            min:100,
            max:999
        }) + "-" + faker.datatype.number({
            min: 1000,
            max: 9999
        });
        product.price = faker.datatype.number({
            min: 0.01,
            max: 999.9,
            precision: 0.01
        });
        product.quantity = faker.datatype.number({
            min: 1,
            max: 299
        })
        product.date = faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z').toDateString();

        product.key = product.code + "-" + product.name;
        return product;
    }

    function createProducts(count = 2){
        console.log("creating data")
        let ProductsList = [];
        for(let i = 0; i < count; i++){
            ProductsList.push(createOne());
        }

        return ProductsList;
    }

    function deleteProduct(record) {
        console.log("Delete Product");
        let newProducts = products.filter((product)=>(product.code !== record.code));
        setProducts(newProducts);
    }

    // "name", "code", "price", "quantity", "date"
    function addProduct(product){
        console.log("add product: " + product)

        let template = createOne();
        template.name = product.name;
        template.code = product.code;
        template.key = template.name + "-" + template.code;

        let newProducts = products.slice();
        // adding new
        if((products.filter((each)=>(each.key === template.key))).length === 0){
            newProducts.push(template);
        }else{
            // updating quantity
            let index = newProducts.findIndex(each => each.key === template.key);
            newProducts[index].quantity += 1;
            console.log("adding quantity " + index + " " + newProducts[index].quantity)
        }
        setProducts(newProducts);
    }

    function toString(product){
        return `${product.code}  ${product.name}  ${product.price}  ${product.quantity}  ${product.date}`
    }
    return (
        <ProductsPage
            products={products}
            onDelete={(record)=>deleteProduct(record)}
            onCreate={(product)=>addProduct(product)}
        />
    )

}


