import express from 'express'
import { dbConnection } from './database/dbConnection.js'
import { globalError } from './src/utilities/globalError.js'
import { bootstrap } from './src/utilities/bootstrap.js'
import dotenv from 'dotenv'
const app = express()
app.set('query parser', 'extended')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
const port = 3000
dotenv.config()
dbConnection()
bootstrap(app)
app.use(globalError)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


