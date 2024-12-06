// for create file.js

const { Router } = require('express');
const {createCustomer}= require ('../controller/controller')
const router = Router();


router.post('/create', createCustomer);

module.exports = router;