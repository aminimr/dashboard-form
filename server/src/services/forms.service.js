const formsModel = require('../models/forms.model')
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const getById = async (id) => {
    return formsModel.findById(id)
}

const getAll = async (userId) => {
    return formsModel.find({
        userId
    })
}

const create = async (payload) => {
    return formsModel.create(payload)
}

const update = async (id, updateBody) => {
    const form = await getById(id)
    if (!form) {
        throw new ApiError(httpStatus.NOT_FOUND, 'فرم مورد نظر یافت نشد.')
    }

    console.log(form)
    Object.assign(form, updateBody);
    await form.save()

    return form
}

const deleteById = async (id) => {
    /*const form = await getById(id)

    if (!form) {
        throw new ApiError(httpStatus.NOT_FOUND, 'فرم مورد نظر یافت نشد.')
    }
    console.log('form', form)*/
    await formsModel.findByIdAndRemove(id)
}

module.exports = {
    create,
    update,
    getById,
    getAll,
    deleteById
}