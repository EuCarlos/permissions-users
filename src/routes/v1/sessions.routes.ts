const express = require('express')
const router = express.Router()

import SessionController from '@controllers/v1/SessionController'

router
    .post('/', SessionController.create)

module.exports = router
