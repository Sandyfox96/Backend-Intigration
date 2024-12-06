// for find all routes
const { Router } = require("express");
const {findAllCustomer} = require("../controller/controller");
const router = Router ();


router.get('/all', findAllCustomer);

module.exports = router;  //export the router   