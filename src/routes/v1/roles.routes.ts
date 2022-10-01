const express = require('express')
const router = express.Router()

import RoleController from '@controllers/v1/RoleController'

router
    .post('/', RoleController.create)

module.exports = router
