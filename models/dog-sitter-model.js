const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogSitterSchema = new Schema ({
    service: [String],
    space: String,
    about: String,
    dogSize: [String],
    dogAge: [String],
    pottyTrained: [String],
    imageUrl: String
});

const DogSitter = mongoose.model('DogSitter', dogSitterSchema)

module.exports = DogSitter;