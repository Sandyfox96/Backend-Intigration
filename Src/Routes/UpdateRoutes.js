const { Router } = require("express");
const { updateCustomer } = require('../controller/controller');
const router = Router();

// PUT route to update customer by ID
router.put("/:id", updateCustomer);

module.exports = router;
