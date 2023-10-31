const joi = require("joi");
const {Types} = require('mongoose')
joi.objectId = require('joi-objectid')(joi);

const listSchema = {}

const singleSchema = {}

const deleteSchema = {
    params: {
        id: joi.objectId().required()
    }
}

const createSchema = {
    body: {
        fullName: joi.string().required(),
        email: joi.string().required(),
        mobile: joi.string().allow('', null),
        birthDate: joi.string().allow('', null),
        gender: joi.string().valid('male', 'female').optional(),
        about: joi.string().allow('', null),
        avatar: joi.string().allow('', null),
        languages: joi.string().allow('', null),
        address: joi.object({
            state: joi.string().allow('', null),
            city: joi.string().allow('', null),
            street: joi.string().allow('', null),
            description: joi.string().allow('', null),
            postalCode: joi.string().allow('', null),
        }).allow(null).optional(),
        education: joi.object({
            caption: joi.string().required(),
            media: joi.array().items(joi.string()),
            level: joi.string().required(),
            from: joi.number(),
            to: joi.number(),
        }).allow(null).optional(),
        draft: joi.boolean().default(true),
        id: joi.objectId().optional().allow(null)
    }
}

const updateSchema = {
    params: {
        id: joi.objectId().required()
    },
    body: {
        ...createSchema.body,
    }
}

module.exports = {
    listSchema,
    singleSchema,
    createSchema,
    updateSchema,
    deleteSchema
}