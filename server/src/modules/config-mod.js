const dotenv = require('dotenv');
const joi = require('joi');
const {flatten} = require('flatten-anything')

module.exports = () => {
    dotenv.config()
    const envVarsSchema = joi
        .object()
        .keys({
            NODE_ENV: joi
                .string()
                .valid("production", "development", "test")
                .default('development'),
            PORT: joi.number().default(3001),
            MONGO_DB_HOST: joi.string().required(),
            MONGO_DB_NAME: joi.string().required(),
            MONGO_DB_USERNAME: joi.string().allow('', null),
            MONGO_DB_PASSWORD: joi.string().allow('', null)
        })
        .unknown();

    const {value: envVars, error} = envVarsSchema
        .prefs({errors: {label: 'key'}})
        .validate(process.env);

    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }

    const envObject = {
        port: envVars.PORT,
        env: envVars.NODE_ENV,
        mongo: {
            host: envVars.MONGO_DB_HOST,
            name: envVars.MONGO_DB_NAME,
            username: envVars.MONGO_DB_USERNAME,
            password: envVars.MONGO_DB_PASSWORD,
        },
    }
    const result = {
        ...flatten(envObject),
        ...envObject
    }

    global.getConfig = function (key) {
        return result[key]
    }

    return (req, res, next) => next()
}