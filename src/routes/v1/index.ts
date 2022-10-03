const express = require('express')
const router = express.Router()

import result from '../../concerns/response'

router
    .get('/', (req, res) => {
        return res.status(200).json(result.response("Request Successfully", true, {
            name: "Carlos Alves",
            repo: "https://github.com/EuCarlos/boilerplate-ts",
            website: "https://carlosalves.vercel.app/"
        }))
    })

module.exports = router
