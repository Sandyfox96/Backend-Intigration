const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Customer } = require("../config/db");

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ message: "Please provide both email and password." });
    }

    try {
        const user = await Customer.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'yourSecretKey', { expiresIn: '1h' });

        res.status(200).send({ message: "Login successful", token });
    } catch (error) {
        res.status(500).send({ message: "Error logging in.", error: error.message });
    }
}

module.exports = { loginUser };
