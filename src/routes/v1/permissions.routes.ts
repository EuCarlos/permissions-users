const express = require('express')
const router = express.Router()

import PermissionController from '@controllers/v1/PermissionController'

router
    .post('/', PermissionController.create)

module.exports = router
