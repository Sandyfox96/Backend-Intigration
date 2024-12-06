// for published all the time

const { Router } = require("express");
const {findAllPublished} = require ('../controller/controller')
const router = Router();


router.get("/publish", findAllPublished);

module.exports = router;  //export the router
