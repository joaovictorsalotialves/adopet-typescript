import express, { type RequestHandler } from 'express'
import { AppDataSource } from '../config/dataSource'
import AdopterController from '../controllers/AdopterController'
import { middlewareValidateAddressBody } from '../middleware/validators/addressRequestBody'
import { middlewareValidateAdopterBody } from '../middleware/validators/adopterRequestBody'
import AdopterRepository from '../repositories/AdopterRepository'

const router = express.Router()

const adopterRepository = new AdopterRepository(AppDataSource.getRepository('Adopter'))
const adopterController = new AdopterController(adopterRepository)

const validateAdopterBody: RequestHandler = (req, res, next) => middlewareValidateAdopterBody(req, res, next)
const validateAddressBody: RequestHandler = (req, res, next) => middlewareValidateAddressBody(req, res, next)

router.post('/', validateAdopterBody, (req, res) => adopterController.createAdopter(req, res))
router.get('/', (req, res) => adopterController.listAdopters(req, res))
router.put('/:id', (req, res) => adopterController.updateAdopter(req, res))
router.patch('/:id', validateAddressBody, (req, res) => adopterController.updateAddressAdopter(req, res))
router.delete('/:id', (req, res) => adopterController.deleteAdopter(req, res))

export default router
