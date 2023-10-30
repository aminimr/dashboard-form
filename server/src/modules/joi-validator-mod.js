const joi = require('joi')

exports.validate = (schema) => (req, res, next) => {
    for (const field of ['params', 'query', 'body', 'headers']) {
        if (schema[field]) {
            const {
                error
            } = joi.object(schema[field]).validate(req[field]);
            if (error) {
                return res.status(422)
                    .send(error.details[0].message);
            }
        }
    }
    return next();
};