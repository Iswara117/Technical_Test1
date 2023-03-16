const router = require("express").Router()

const auth = require("../controllers/auth.controllers")

router.post("/signin", auth.signin)

module.exports = router;