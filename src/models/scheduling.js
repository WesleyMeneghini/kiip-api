const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateService: {
        type: String,
        required: true,
    },
    hourService: {
        type: String,
        // required: true,
    },
    typeService: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    }],
    createDate: {
        type: Date,
        require: true,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'disable', 'pending', 'completed', 'canceled'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Scheduling', schema);