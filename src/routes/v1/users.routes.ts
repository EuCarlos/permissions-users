const express = require('express')
const router = express.Router()

import UserController from '@controllers/v1/UserController'

router
    .post('/', UserController.create)

module.exports = router
