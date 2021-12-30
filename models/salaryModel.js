const mongoose = require('mongoose')

const salarySchema = new mongoose.Schema({
    
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

module.exports = mongoose.model('salary', salarySchema)