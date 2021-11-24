const mongoose = require('mongoose')

const envelopeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('envelopes', envelopeSchema)