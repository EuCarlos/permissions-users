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
const SessionV1Router = require('./routes/v1/sessions.routes')
const PermissionV1Router = require('./routes/v1/permissions.routes')
const RoleV1Router = require('./routes/v1/roles.routes')
const ProductV1Router = require('./routes/v1/products.routes')

import result from './concerns/response'

const PORT = process.env.PORT || 3333

const app = express();

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))

    .use('/api/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocsV1 ))
    .use('/api/v1/workouts', v1Router)
    .use('/api/v1/users', UsersV1Router)
    .use('/api/v1/sessions', SessionV1Router)
    .use('/api/v1/permissions', PermissionV1Router)
    .use('/api/v1/roles', RoleV1Router)
    .use('/api/v1/products', ProductV1Router)

    .use((req, res) => {
        const pathname = req.originalUrl

        res.status(404).json(result.response(`Can't found this route: ${pathname}`, false));
    })

    .listen(PORT, () => {
        console.log(`\n🔥 Server is running in PORT ${PORT} - ${process.env.NODE_ENV}\n📚 Documentation is on the route: /api/v1/docs`)
    })

console.log("\n🛣️  ROUTES")
app._router.stack.forEach(print.bind(null, []))

