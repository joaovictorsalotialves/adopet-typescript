import express from 'express'
import { AppDataSource } from '../config/dataSource'
import AdopterController from '../controllers/AdopterController'
import AdopterRepository from '../repositories/AdopterRepository'

const router = express.Router()

const adopterRepository = new AdopterRepository(AppDataSource.getRepository('Adopter'))
const adopterController = new AdopterController(adopterRepository)

router.post('/', (req, res) => adopterController.createAdopter(req, res))
router.get('/', (req, res) => adopterController.listAdopters(req, res))
router.put('/:id', (req, res) => adopterController.updateAdopter(req, res))
router.patch('/:id', (req, res) => adopterController.updateAddressAdopter(req, res))
router.delete('/:id', (req, res) => adopterController.deleteAdopter(req, res))

export default router
