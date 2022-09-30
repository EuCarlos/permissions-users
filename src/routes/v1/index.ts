const express = require('express')
const router = express.Router()

import { JsonResponse } from '../../concerns/response'

router
    .get('/', (req, res) => {
        var result = new JsonResponse("Request Successfully", true, {
            name: "Carlos Alves",
            repo: "https://github.com/EuCarlos/boilerplate-ts",
            website: "https://carlosalves.vercel.app/"
        }).response()

        return res.status(200).json(result)
    })

module.exports = router
