const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const morgan = require('morgan')

const routes = require('./src/routes.ts')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

routes(app, fs)

dotenv.config()
const { SERVER_PORT } = process.env
app.listen(SERVER_PORT, () => {
  console.log(`[server]: Server is running at http://localhost:%s`, SERVER_PORT)
})
