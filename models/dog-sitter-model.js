const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogSitterSchema = new Schema ({
    name: String,
    dogAge: String,
    pottyTrained: Boolean,
    rate: Number,
    services: [],
    size: [],
    imageUrl: String,
    space: String,
    about: String,
    area: String

});

const DogSitter = mongoose.model('DogSitter', dogSitterSchema)

module.exports = DogSitter;