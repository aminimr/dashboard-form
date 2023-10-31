const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs');
const joi = require('joi');
const joiValidator = require('../modules/joi-validator-mod');
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const loginValidationSchema = {
    body: {
        username: joi.string().required(),
        password: joi.string().required(),
    },
    query: {
        id: joi.string()
    }
}

const login = catchAsync(async (req, res, next) => {
    const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../users.json'), 'utf-8'));
    const user = users.find(user => user.username === req.body.username)
    if(!user){
        throw new ApiError(httpStatus.UNAUTHORIZED, 'نام کاربری یا کلمه عبور صحیح نمی باشد.')
    }
    res.send({
        data: user.id,
        success: true
    })
})
router.post('/login', joiValidator.validate(loginValidationSchema), login)

module.exports = router