const { Router } = require('express');
const {findOneCustomer} = require ('../controller/controller')
const router = Router();



router.get('/:id',findOneCustomer);

module.exports = router;