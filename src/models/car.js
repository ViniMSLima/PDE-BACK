const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        minlength: 1
    },
    model: {
        type: String,
        required: true,
        minlength: 1
    },
    year: {
        type: String,
        required: true,
        minlength: 4
    },
    createdAt: {
        type: Date,
        required: true,
    },
    plate: {
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