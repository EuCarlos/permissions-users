const express = require('express')
const router = express.Router()

import ProductController from '@controllers/v1/ProductController'

import { is } from 'src/middlewares/permission'

router
    .post('/', is(['ROLE_ADMIN']), ProductController.create)
    .get('/', is(['ROLE_ADMIN', 'ROLE_USER']), ProductController.index)
    .get('/:id', is(['ROLE_ADMIN', 'ROLE_USER']), ProductController.show)

module.exports = router
