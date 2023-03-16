const express = require('express')
const router = express.Router()

const Users = require('./user');

router.use("/auth", Users)

  module.exports = router;