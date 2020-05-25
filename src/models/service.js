const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: [true, 'O slug é obrigatório'],
        trim: true,
        index: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: 'produto-sem-imagem.jpeg'
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'disable'],
        default: 'active'
    }
});

module.exports = mongoose.model('Service', schema);
