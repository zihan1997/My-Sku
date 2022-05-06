import React, {useEffect, useState} from "react";
import {faker} from "@faker-js/faker"
import ProductsPage from "./ProductPage";
// Attributes
// "name", "code", "price", "quantity", "date"
// ####-###-### 4-3-4
export default function ProductsDB(){
    const [products, setProducts] = useState(createProducts());

    useEffect(()=>{
        setProducts(products)
    }, [products.map(product=>product.code)]);

    function createOne(key){
        let product = {};
        product.key = key;
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
        return product;
    }

    function createProducts(count = 2){
        console.log("creating data")
        let ProductsList = [];
        for(let i = 0; i < count; i++){
            ProductsList.push(createOne(i+1));
        }

        // let list = ProductsList.map(product => product.code)
        // console.log(list)
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
        if(product.price === undefined){
            product.price = template.price;
        }
        if(product.quantity === undefined){
            product.quantity = template.quantity;
        }
        if(product.date === undefined){
            product.date = template.date;
        }
        product.key = products.length + 1;
        if((products.filter((each)=>(each.code === product.code))).length === 0){
            let newProducts = products.slice();
            newProducts.push(product);
            setProducts(newProducts);
        }
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


