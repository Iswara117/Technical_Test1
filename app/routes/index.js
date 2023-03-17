const express = require('express')
const router = express.Router()

const Users = require('./user');
const Order = require('./order')

router.use("/auth", Users)
router.use("/order", Order)

  module.exports = router;