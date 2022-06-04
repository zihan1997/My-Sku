'use strict'

const {Model} = require('objection');
const Knex = require('knex')
const config = require('../config')

const knex = Knex(config)
Model.knex(knex);


class Product extends Model{
    static get tableName(){
        return 'products'
    }

    // JSON schema
    // static get jsonSchema(){
    //     return {
    //         $schema: "http://json-schema.org/draft-04/schema#",
    //         type: 'object',
    //         required: ["code", "name", "price", "quantity", "date"],
    //         properties: {
    //             code: {type: 'string', minLength: 1},
    //             name: {type: 'string', minLength: 1},
    //             price: {type: 'number'},
    //             quantity: {type: 'integer'},
    //             date: {type: 'string'}
    //         }
    //     }
    // }

    static get idColumn(){
        return 'key'
    }

}

module.exports = Product;