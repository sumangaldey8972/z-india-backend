const express = require("express")
const { check_session, destroy_session } = require("../controller/session.controller")
const router = express.Router()

router.get('/', check_session)
router.delete('/', destroy_session)


module.exports = router