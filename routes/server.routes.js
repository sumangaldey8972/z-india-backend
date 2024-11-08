const express = require("express")
const router = express.Router()


router.get('/', (req, res) => {
    res.send('Welcomt to Z-INDIA-SERVER')
})


module.exports = router