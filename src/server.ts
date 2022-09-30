// imports
import express from 'express'
import { print } from './routes/functions/printPaths'
import swaggerUI from 'swagger-ui-express'
import swaggerDocsV1 from './docs/v1/swagger.json'
import 'reflect-metadata'
import './database'
require("dotenv").config()
var bodyParser = require('body-parser')

// routes
const v1Router = require('./routes/v1')
const UsersV1Router = require('./routes/v1/users.routes')

import { JsonResponse } from './concerns/response'

const PORT = process.env.PORT || 3333

const app = express();

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))

    .use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocsV1 ))
    .use('/api/v1/workouts', v1Router)
    .use('/api/v1/users', UsersV1Router)

    .use((req, res) => {
        const pathname = req.originalUrl
        const result = new JsonResponse(`Can't found this route: ${pathname}`, false).response()

        res.status(404).json(result);
    })

    .listen(PORT, () => {
        console.log(`🔥 Server is running in PORT ${PORT} - ${process.env.NODE_ENV}`)
    })

console.log("🛣️  ROUTES")
app._router.stack.forEach(print.bind(null, []))

console.log("📚 Documentation is on the route: /api/v1/docs")
