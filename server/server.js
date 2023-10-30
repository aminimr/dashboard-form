const configModule = require('./src/modules/config-mod')
const databaseModule = require('./src/modules/database-mod')
const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const app = express()

// apis
const forms = require('./src/api/forms')
const login = require('./src/api/auth')

configModule()
databaseModule()

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.static('files'))
app.use(express.static('static'))
app.use(express.urlencoded({extended: true}));

app.get('/health', function (req, res) {
    res.send('ok')
})

app.use('/forms', forms)
app.use('/auth', login)

const port = getConfig('port')
app.listen(port, () => {
    console.log(`app is running on port ${port}`)
})
