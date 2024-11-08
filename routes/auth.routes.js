const express = require("express")
const { signUpController, signInController } = require("../controller/auth.controller")
const { authErros } = require("../error/auth.error")
const router = express.Router()

router.post('/sign-up', signUpController)

router.post('/sign-in', signInController)


router.use(authErros)

module.exports = router