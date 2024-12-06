const { Router } = require('express');
const { deleteAllCustomer } = require('../controller/controller');  // Ensure this is a function
const router = Router();

// Ensure the route handler is correctly attached to the delete request
router.delete('/deleteAll', deleteAllCustomer);

module.exports = router;
