// for delete one only

const { Router } = require("express");
const { deleteCustomer } = require("../controller/controller");
const router = Router();

router.delete("/:id", deleteCustomer);

module.exports = router;
