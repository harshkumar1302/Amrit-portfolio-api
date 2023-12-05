const mongoose = require('mongoose')

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    hostedby: [{
        type: String,
        required: true,
        trim: true
    }],
    certificatelink: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Achievement = mongoose.model('Achievement', achievementSchema)

module.exports = Achievement