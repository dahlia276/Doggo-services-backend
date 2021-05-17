const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogOwnerSchema = new Schema ({
    service: [String],
    address: String,
    pickUp: Number,
    dropOff: Number,
    dogSize: [String],
    dogAge: [String],
    otherDogs: [String],
    imageUrl: String,
    specialComments: String
});

const DogOwner = mongoose.model('DogOwner', dogOwnerSchema)

module.exports = DogOwner;