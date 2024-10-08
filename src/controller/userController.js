const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
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

    static async postUser(req, res) {
        const { name, carplate, residence, cpf, carbrand, carmodel, caryear} = req.body;

        if (!name || !carplate || !residence || !cpf || !carbrand || !carmodel || !caryear)
            return res.status(400).send({ message: 'Field\'s can\'t be empty.' });

        var verify = await User.findOne({ cpf: cpf });
        if (verify) {
            return res.status(401).send({ error: 'An user with this CPF already exists!' });
        }

        const user = new User({
            name,
            carplate,
            residence,
            cpf,
            carbrand,
            caryear,
            carmodel,
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
