const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs');
const joi = require('joi');
const joiValidator = require('../modules/joi-validator-mod');

const loginValidationSchema = {
    body: {
        username: joi.string().required(),
        password: joi.string().required(),
    },
    query: {
        id: joi.string()
    }
}

const login = async (req, res, next) => {
    const users = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../users.json'), 'utf-8'));
    const user = users.find(user => user.username === req.body.username)
    res.send(user)
}
router.post('/login', joiValidator.validate(loginValidationSchema), login)

module.exports = router