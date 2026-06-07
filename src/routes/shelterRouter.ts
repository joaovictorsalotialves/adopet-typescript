import express, { type RequestHandler } from 'express'
import { AppDataSource } from '../config/dataSource'
import ShelterController from '../controllers/ShelterController'
import { middlewareValidateAddressBody } from '../middleware/validators/addressRequestBody'
import { middlewareValidateShelterBody } from '../middleware/validators/shelterRequestBody'
import { verifyIdMiddleware } from '../middleware/verifyId'
import ShelterRepository from '../repositories/ShelterRepository'

const router = express.Router()

const shelterRepository = new ShelterRepository(AppDataSource.getRepository('Shelter'))
const shelterController = new ShelterController(shelterRepository)

const validateShelterBody: RequestHandler = (req, res, next) => middlewareValidateShelterBody(req, res, next)
const validateAddressBody: RequestHandler = (req, res, next) => middlewareValidateAddressBody(req, res, next)

router.post('/', validateShelterBody, (req, res) => shelterController.createShelter(req, res))
router.get('/', (req, res) => shelterController.listShelters(req, res))
router.put('/:id', verifyIdMiddleware, (req, res) => shelterController.updateShelter(req, res))
router.patch('/:id', verifyIdMiddleware, validateAddressBody, (req, res) =>
  shelterController.updateAddressShelter(req, res)
)
router.delete('/:id', verifyIdMiddleware, (req, res) => shelterController.deleteShelter(req, res))

export default router
