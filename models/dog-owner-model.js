const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogOwnerSchema = new Schema ({
    service: [String],
    address: String,
    pickUp: Date,
    dropOff: Date,
    dogSize: String,
    dogAge: String,
    otherDogs: String,
    specialComments: String
});

const DogOwner = mongoose.model('DogOwner', dogOwnerSchema)

module.exports = DogOwner;