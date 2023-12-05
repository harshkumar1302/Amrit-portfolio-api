const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
    title1: {
        type: String,
        required: true,
        trim: true
    },
    description1: {
        type: String,
        required: true,
        trim: true
    },
    skill1: [{
        type: String,
        required: true,
        trim: true
    }],
    tools1: [{
        type: String,
        required: true
    }],
    title2: {
        type: String,
        required: true,
        trim: true
    },
    description2: {
        type: String,
        required: true,
        trim: true
    },
    skill2: [{
        type: String,
        required: true,
        trim: true
    }],
    tools2: [{
        type: String,
        required: true
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Skill = mongoose.model('Skill', skillSchema)

module.exports = Skill