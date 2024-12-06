const { Router } = require("express");
const {RegisterCustomer}  = require("../controller/RegisterCustomer.js");
const router = Router();

router.post("/", RegisterCustomer);

module.exports = router;
    