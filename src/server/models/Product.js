'use strict'

const {Model} = require('objection');
const Knex = require('knex')
const config = require('./config')

const knex = Knex(config)
Model.knex(knex);


class Product extends Model{
    static get tableName(){
        return 'products'
    }

    // JSON schema
    // static get jsonSchema(){
    //     return {
    //         type: 'object',
    //         require: ['']
    //     }
    // }

    static get idColumn(){
        return 'key'
    }

}

async function main(){
    const product = await Product.query().findById(1);
    console.log(product);

    // const test = await Product.query().insert({
    //     code: '1',
    //     name: '1',
    //     price: 10,
    //     quantity: 3,
    //     date: "2022-05-11",
    // })
    // console.log('test: ' + test)
    console.log(await Product.query())
}
main()
    .then(()=> knex.destroy())
    .catch(err=>{
        console.log(err);
        return knex.destroy();
    })
