const {Schema, model} = require('mongoose');

const formsSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
    },
    address: {
        state: String,
        city: String,
        street: String,
        description: String,
        postalCode: String,
    },
    birthDate: String,
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    about: String,
    languages: [String],
    educations: [{
        caption: {
            type: String,
            required: true
        },
        media: [String],
        level: {
            type: String,
            required: true
        },
        from: {
            type: Number,
            required: false
        },
        to: {
            type: Number,
            required: false
        }
    }],
    draft: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Number,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

module.exports = model('forms', formsSchema)