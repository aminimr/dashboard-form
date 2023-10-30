const formsModel = require('../models/forms.model')
const getAll = async (userId)=> {
    return formsModel.find({
        userId: userId
    })
}

module.exports = {
    getAll
}