const formService = require('../services/forms.service')

const createForm = (prefer) => {
    return formService.create({
        // address: {
        //     state: '',
        //     city: '',
        //     description: '',
        //     postalCode: ''
        // },
        // education: {
        //     caption: '',
        //     level: '',
        //     from: null,
        //     to: null,
        //     media: []
        // },
        birthDate: '',
        languages: '',
        gender: 'male',
        about: '',
        email: 'test@gmail.com',
        fullName: 'نام پیش فرض',
        mobile: '',
        ...prefer ?? {}
    })
}

module.exports = {
    createForm
}