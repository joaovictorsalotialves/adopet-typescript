import type express from 'express'
import adopterRouter from './adopterRouter'
import petRouter from './petRouter'
import shelterRouter from './shelterRouter'

const router = (app: express.Router) => {
  app.use('/pets', petRouter)
  app.use('/adopters', adopterRouter)
  app.use('/shelters', shelterRouter)
}

export default router
