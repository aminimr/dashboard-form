const configModule = require('./src/modules/config-mod')
const databaseModule = require('./src/modules/database-mod')
const authMod = require('./src/modules/auth-mod')
const cors = require('cors')
const httpStatus = require('http-status');
const {errorConverter, errorHandler} = require('./src/modules/error-handling-mod')
const helmet = require('helmet')
const express = require('express')
const app = express()

// apis
const forms = require('./src/api/forms')
const login = require('./src/api/auth')
const ApiError = require("./src/utils/ApiError");
const path = require("path");

configModule()
databaseModule()

app.use(cors())
app.options('*', cors());
app.use(helmet())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '/files')))
app.use(express.static(path.resolve(__dirname, '/static')))
app.use(express.urlencoded({extended: true}));

app.use('/forms', forms)
app.use('/auth', login)

// error handling
app.use(errorConverter);
app.use(errorHandler);
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'درخواست مورد نظر یافت نشد.'));
});

const port = getConfig('port')
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})
