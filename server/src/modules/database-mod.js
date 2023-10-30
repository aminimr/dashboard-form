const mongoose = require("mongoose");
module.exports = async () => {
    try {
        const {host, name, username, password} = getConfig('mongo')
        const credential = (username && password) ? `${username}:${password}@` : ''
        await mongoose.connect(`mongodb://${credential}${host}/${name}`);
        console.log('mongodb is connected.')
    } catch (ex) {
        console.error(ex)
    }

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

    return (req, res, next) => next()
}