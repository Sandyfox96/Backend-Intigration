const bcrypt = require("bcryptjs");
const { Customer } = require("../config/db");

async function RegisterCustomer(req, res) {
  const { firstName, lastName, email, phone, password } = req.body;

  // Check for missing fields
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).send({ message: "Please provide all required fields." });
  }

  try {
    // Check if user already exists
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).send({ message: "User already exists." });
    } 

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new customer with the hashed password
    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).send({ message: "User registered successfully." });
  } catch (error) {
    console.error(error); 
    res.status(500).send({
      message: "Error registering user.",
      error: error.message,
    });
  }
}

module.exports = { RegisterCustomer };
