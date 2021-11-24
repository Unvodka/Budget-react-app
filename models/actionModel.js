const mongoose = require('mongoose')

const actionSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    envelopeId: {
        type: String,
        required: true
    },
    transaction: {
      type: Number,
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('actions', actionSchema)