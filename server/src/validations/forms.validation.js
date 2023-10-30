const joiValidator = require("../modules/joi-validator-mod");
const joi = require("joi");

const listSchema = {query: {userId: joi.number().required()}}
const singleSchema = {query: {userId: joi.number().required()}}
const submitSchema = {
    query: {userId: joi.number().required()},
    body: {
        fullName: joi.string().required()
    }
}


module.exports = {
    listSchema,
    singleSchema,
    submitSchema
}