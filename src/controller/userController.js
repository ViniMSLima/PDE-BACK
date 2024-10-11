const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const { Car } = require("../models/car");
require("dotenv").config();

class UserController {
    static async getUsers(req, res) {
        try {
            const users = await User.find();
            return res.status(200).send({ users });
        } catch (error) {
            return res.status(404).send({ error: 'Users not found!' });
        }
    }

    static async getUserByCarPlate(req, res) {
        const { plate } = req.query;

        try {
            const car = await Car.findOne({ plate: plate });
            let result = null;

            const users = await User.find();
            users.forEach(user => {
                user.carsId.forEach(carId => {
                    if(carId == car._id.toString())
                    {
                        result = user;
                    }
                });               
            });
            return res.status(200).send({ result });
        } catch (error) {
            return res.status(404).send({ error: 'No users found with this car plate!' });
        }
    }

    static async postUser(req, res) {
        const { name, carsId, residence, cpf} = req.body;

        if (!name || !carsId || !residence || !cpf)
            return res.status(400).send({ message: 'Field\'s can\'t be empty.' });

        var verify = await User.findOne({ cpf: cpf });
        if (verify) {
            return res.status(401).send({ error: 'An user with this cpf already exists!' });
        }

        const user = new User({
            name,
            carsId,
            residence,
            cpf,
            release: Date.now(),
            createdAt: Date.now(),
        });

        try {
            await user.save();
            res.status(201).send({ message: 'User registered successfully!' });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: 'Something failed while creating a user.' });
        }
    }

    static async clearUsers(req, res) {
        try {
            await User.deleteMany({});
            return res.status(200).send({ message: 'All Users deleted successfully!' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while clearing users.' });
        }
    }

    static async deleteById(req, res) {
        const { id } = req.params;

        try {
            const deletedUser = await User.findByIdAndDelete(id);

            if (!deletedUser) {
                return res.status(404).send({ message: 'User not found!' });
            }

            return res.status(200).send({ message: 'User deleted successfully!' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Something went wrong while deleting user.' });
        }
    }

}

module.exports = UserController;
