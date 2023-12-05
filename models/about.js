const mongoose = require('mongoose')

const aboutSchema = new mongoose.Schema({
    description: [{
        type: String,
        required: true,
        trim: true
    }],
    resumelink: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const About = mongoose.model('About', aboutSchema)

module.exports = About