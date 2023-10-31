const express = require('express')
const router = express.Router()
const joiValidator = require('../modules/joi-validator-mod');
const {listSchema, singleSchema, createSchema, updateSchema, deleteSchema} = require('../validations/forms.validation')
const formService = require('../services/forms.service')
const multer = require('multer');
const path = require("path");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const authMod = require("../modules/auth-mod");
const formSeed = require('../seed/form.seed')

const list = catchAsync(async (req, res, next) => {
    const list = await formService.getAll(req.userId)
    if (list.length === 0 && getConfig('createFormIfNotExist')) {
        const newForm = await formSeed.createForm({userId: req.userId})
        list.push(newForm)
    }
    res.send({
        data: list,
        success: true
    })
})

const single = catchAsync(async (req, res, next) => {
    const form = await formService.getById(req.params.id)
    const notExist = !form

    if (notExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'فرم مورد نظر یافت نشد.');
    } else if (form.userId !== req.userId) {
        throw new ApiError(httpStatus.FORBIDDEN, 'دسترسی به فرم مورد نظر امکان پذیر نمی باشد.');
    }

    res.send({
        success: true,
        data: form
    })
})

const create = catchAsync(async (req, res, next) => {
    const result = await formService.create({
        ...req.body,
        userId: req.userId
    })

    res.send({
        data: result,
        success: true
    })
})

const update = catchAsync(async (req, res, next) => {
    console.log(req.params.id)
    const form = await formService.getById(req.params.id)

    if (form.userId !== req.userId) {
        throw new ApiError(httpStatus.FORBIDDEN, 'دسترسی جهت بروزرسانی فرم مورد نظر وجود ندارد.')
    }

    Object.assign(form, req.body);
    await form.save()

    res.send({
        data: form,
        success: true
    })
})

const deleteById = catchAsync(async (req, res, next) => {
    await formService.deleteById(req.params.id)

    res.status(httpStatus.NO_CONTENT).send({
        success: true
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../files'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const uploadFile = multer({storage: storage});
const upload = catchAsync(async (req, res) => {
    // Handle the uploaded file
    const baseUrl = `http://localhost:${getConfig('port')}/files`
    const filePaths = req.files.map(file => `${baseUrl}/${file?.filename}`)
    // console.log(req.files)
    res.json({message: 'File uploaded successfully!', success: true, data: filePaths});
})

router.post('/upload', authMod(), uploadFile.array('files'), upload)
router.get('/', authMod(), joiValidator.validate(listSchema), list)
router.post('/', authMod(), joiValidator.validate(createSchema), create)
router.patch('/:id', authMod(), joiValidator.validate(updateSchema), update)
router.delete('/:id', authMod(), joiValidator.validate(deleteSchema), deleteById)
router.get('/:id', authMod(), joiValidator.validate(singleSchema), single)

module.exports = router