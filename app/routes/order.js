const router = require("express").Router()
const order = require('../controllers/orders.controllers')
const auth = require('../../middlewares/auth')
const isApproval = require('../../middlewares/isApproval')
const isLeader = require('../../middlewares/isLeader')

router.post("/add-order", auth, order.addOrder)
router.put("/approval/update-order/:id",   auth ,isApproval,order.updateStatusOrder1)
router.put("/leader/update-order/:id",   auth ,isLeader,order.updateStatusOrder2)
router.get("/get-approve", auth, order.getData_Need_Approval)
router.get("/get-all", auth, order.getData_Create_Order)
module.exports = router;