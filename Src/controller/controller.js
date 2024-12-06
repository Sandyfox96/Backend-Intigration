const db = require('../config/db.js');
const Customer = require ('../config/db.js')


// Create a new customer
function createCustomer(req, res) {
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.phone) {
        return res.status(400).send({
            message: "Please fill in all required fields.",
        });
    }

    const customerObject = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address || null,
        postalAddress: req.body.postalAddress || null,
    };

    Customer.create(customerObject)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while creating the customer."
        }));
}

// Retrieve all customers
function findAllCustomer(req, res) {
    const title = req.query.title; // Optional filter based on title
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Customer.findAll({ where: condition })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while retrieving Customers."
        }));
}

// Retrieve a single customer by ID
function findOneCustomer(req, res) {
    const id = req.params.id; // Fetch the ID from route parameters

    Customer.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Customer with id=${id}.`
                });
            }
        })
        .catch(err => res.status(500).send({
            message: "Error retrieving Customer with id=" + id
        }));
}

// Update a customer by ID
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, phone, address, postalAddress } = req.body;

    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        customer.firstName = firstName || customer.firstName;
        customer.lastName = lastName || customer.lastName;
        customer.email = email || customer.email;
        customer.phone = phone || customer.phone;
        customer.address = address || customer.address;
        customer.postalAddress = postalAddress || customer.postalAddress;

        await customer.save();
        return res.status(200).json(customer);
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// controller/controller.js

  
// Delete a customer by ID
function deleteCustomer(req, res) {
    const id = req.params.id; // Fetch the ID from route parameters

    Customer.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            } else {
                res.status(404).send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => res.status(500).send({
            message: "Could not delete Customer with id=" + id
        }));
}

// Delete all customers
function deleteAllCustomer(req, res) {
    Customer.destroy({
        where: {},
        truncate: false
    })
        .then(nums => res.send({ message: `${nums} Customers were deleted successfully!` }))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while removing all Customers."
        }));
}

// Retrieve all published customers
function findAllPublished(req, res) {
    Customer.findAll({ where: { published: true } })
        .then(data => res.send(data))
        .catch(err => res.status(500).send({
            message: err.message || "Some error occurred while retrieving published Customers."
        }));
}

module.exports = {
    createCustomer,
    findAllCustomer,
    findOneCustomer,
    updateCustomer,
    deleteCustomer,
    deleteAllCustomer,
    findAllPublished,
};
