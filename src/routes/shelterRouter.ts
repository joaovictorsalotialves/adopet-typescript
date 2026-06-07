import express from 'express'
import { AppDataSource } from '../config/dataSource'
import ShelterController from '../controllers/ShelterController'
import ShelterRepository from '../repositories/ShelterRepository'

const router = express.Router()

const shelterRepository = new ShelterRepository(AppDataSource.getRepository('Shelter'))
const shelterController = new ShelterController(shelterRepository)

router.post('/', (req, res) => shelterController.createShelter(req, res))
router.get('/', (req, res) => shelterController.listShelters(req, res))
router.put('/:id', (req, res) => shelterController.updateShelter(req, res))
router.patch('/:id', (req, res) => shelterController.updateAddressShelter(req, res))
router.delete('/:id', (req, res) => shelterController.deleteShelter(req, res))

export default router
