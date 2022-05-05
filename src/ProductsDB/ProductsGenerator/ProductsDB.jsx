import React, {useEffect, useState} from "react";
import {faker} from "@faker-js/faker"
import ProductsPage from "../../pages/components/ProductPage/Products";
// Attributes
// "name", "code", "price", "quantity", "date"
// ####-###-### 4-3-4
export default function ProductsDB(){
    const [products, setProducts] = useState(createProducts());

    useEffect(()=>{
        setProducts(products)
    }, [products]);

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

    function createProducts(count = 20){
        console.log("creating data")
        let ProductsList = [];
        for(let i = 0; i < count; i++){
            ProductsList.push(createOne(i+1));
        }
        return ProductsList;
    }

    function deleteProduct(record) {
        console.log("Delete Product");
        let newProducts = products.filter((product)=>(product.code !== record.code));
        console.log("Delete Product")
        setProducts(newProducts);
    }

    return (
        <ProductsPage
            products={products}
            onDelete={(record)=>deleteProduct(record)}
        />
    )

}


function getProducts(count = 10){
    CreateData(count);
    return ProductData;
}


