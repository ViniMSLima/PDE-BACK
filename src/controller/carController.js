const { Car } = require("../models/car");
require("dotenv").config();

class CarController {
    static async getCar(req, res) {
        try {
            const cars = await Car.find();
            return res.status(200).send({ cars });
        } catch (error) {
            return res.status(404).send({ error: 'Cars not found!' });
        }
    }

    static async getCarByCarPlate(req, res) {
        const { carplate } = req.query;

        try {
            const cars = await Car.findOne({ carplate: carplate });;
            return res.status(200).send({ cars });
        } catch (error) {
            return res.status(404).send({ error: 'Cars not found!' });
        }
    }

    static async postCar(req, res) {
        const { plate, brand, model, year} = req.body;

        if (!plate  || !brand || !model || !year)
            return res.status(400).send({ message: 'Field\'s can\'t be empty.' });

        var verify = await User.findOne({ cpf: cpf });
        if (verify) {
            return res.status(401).send({ error: 'An user with this CPF already exists!' });
        }

        const car = new ({
            plate,
            brand,
            model,
            year,
            release: Date.now(),
            createdAt: Date.now(),
        });

        try {
            await car.save();
            res.status(201).send({ message: 'Car registered successfully!' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while creating a car.' });
        }
    }

    static async clearCars(req, res) {
        try {
            await Car.deleteMany({});
            return res.status(200).send({ message: 'All Cars deleted successfully!' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing cars.' });
        }
    }

    static async deleteById(req, res) {
        const { id } = req.params;

        try {
            const deletedCar = await Car.findByIdAndDelete(id);

            if (!deletedCar) {
                return res.status(404).send({ message: 'Car not found!' });
            }

            return res.status(200).send({ message: 'Car deleted successfully!' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while deleting car.' });
        }
    }
}

module.exports = CarController;
