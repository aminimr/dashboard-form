const express = require('express')
const router = express.Router()
const joiValidator = require('../modules/joi-validator-mod');
const {listSchema, singleSchema, submitSchema} = require('../validations/forms.validation')
const formService = require('../services/forms.service')
const multer = require('multer');
const path = require("path");

const list = async (req, res, next) => {
    const list = await formService.getAll(req.query.userId)
    res.send(list)
}

const single = async (req, res, next) => {
    res.send('single:ok')
}

const submit = async (req, res, next) => {
    res.send('submit:ok')
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../files'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const uploadFile = multer({ storage: storage });
const upload = async (req, res) => {
    // Handle the uploaded file
    console.log(req.file)
    res.json({message: 'File uploaded successfully!', file: req.file});
}

router.post('/upload', uploadFile.single('file'), upload)
router.get('/', joiValidator.validate(listSchema), list)
router.post('/', joiValidator.validate(submitSchema), submit)
router.get('/:id', joiValidator.validate(singleSchema), single)

module.exports = router