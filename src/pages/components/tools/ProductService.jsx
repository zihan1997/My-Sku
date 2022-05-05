import Papa from "papaparse";

export function getProducts() {
    return products;
}
export function getProduct(id) {
    return products.find((product)=>(
        product.number === id
    ))
}


let products = [
    {
        name: "Santa Monica",
        number: 1995,
        amount: "$10,800",
    },
    {
        name: "Stankonia",
        number: 2000,
        amount: "$8,000",
    },
    {
        name: "Ocean Avenue",
        number: 2003,
        amount: "$9,500",
    },
    {
        name: "Tubthumper",
        number: 1997,
        amount: "$14,000",
    },
    {
        name: "Wide Open Spaces",
        number: 1998,
        amount: "$4,600",
    },
]