const { Router } = require('express');
const { loginUser } = require('../controller/loginUser');
const router = Router();

router.post('/login', loginUser);


module.exports = router;
