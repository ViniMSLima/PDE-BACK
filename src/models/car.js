const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    carbrand: {
        type: String,
        required: true,
        minlength: 1
    },
    carmodel: {
        type: String,
        required: true,
        minlength: 1
    },
    caryear: {
        type: String,
        required: true,
        minlength: 4
    },
    createdAt: {
        type: Date,
        required: true,
    },
    carplate: {
        type: String,
        required: true,
        minlength: 7,
    },
    updatedAt: {
        type: Date,
        required: false,
    },
    removedAt: {
        type: Date,
        required: false,
    },
});

const Car = mongoose.model("Car", CarSchema);
exports.Car = Car;
exports.CarSchema = CarSchema;