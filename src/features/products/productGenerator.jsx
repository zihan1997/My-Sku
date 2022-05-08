import React, {useEffect, useState} from "react";
import {faker} from "@faker-js/faker"



/*
* Attributes
* "name", "code", "price", "quantity", "date"
* ####-###-### 4-3-4
* */

export const createCode = ()=>(
    faker.datatype.number({
        min: 1000,
        max: 9999
    })+ "-" + faker.datatype.number({
        min:100,
        max:999
    }) + "-" + faker.datatype.number({
        min: 1000,
        max: 9999
    })
);

export const createName = () => (
    faker.commerce.productName()
);

export const createPrice = () => {
    return faker.datatype.number({
        min: 0.01,
        max: 999.9,
        precision: 0.01
    })
}

export const createQuantity = () => {
    return faker.datatype.number({
        min: 1,
        max: 299
    })
}
export const createDate = () => {
    return faker.date.between('2020-01-01T00:00:00.000Z', '2022-01-01T00:00:00.000Z').toDateString();
}