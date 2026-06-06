import 'express-async-errors'
import express from 'express'
import router from './routes'
import 'reflect-metadata'
import { AppDataSource } from './config/dataSource'
import { errorMiddleware } from './middleware/error'

const app = express()
app.use(express.json())
router(app)

app.use(errorMiddleware)

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch(err => {
    console.error('Error during Data Source initialization:', err)
  })

export default app
