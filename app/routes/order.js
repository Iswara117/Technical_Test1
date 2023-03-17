const router = require("express").Router()
const order = require('../controllers/orders.controllers')
const auth = require('../../middlewares/auth')
const isApproval = require('../../middlewares/isApproval')

router.post("/add-order", auth, order.addOrder)
router.put("/approval/update-order/:id",   auth ,isApproval,order.updateStatusOrder1)

module.exports = router;