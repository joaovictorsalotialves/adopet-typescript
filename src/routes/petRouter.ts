import express from 'express'
import { AppDataSource } from '../config/dataSource'
import PetController from '../controllers/PetController'
import PetRepository from '../repositories/PetRepository'

const router = express.Router()

const petRepository = new PetRepository(AppDataSource.getRepository('Pet'), AppDataSource.getRepository('Adopter'))
const petController = new PetController(petRepository)

router.post('/', (req, res) => petController.createPet(req, res))
router.get('/', (req, res) => petController.listPets(req, res))
router.get('/size', (req, res) => petController.searchPetsBySize(req, res))
router.put('/:id', (req, res) => petController.updatePet(req, res))
router.put('/:petId/:adopterId', (req, res) => petController.addPetToAdopter(req, res))
router.delete('/:id', (req, res) => petController.deletePet(req, res))

export default router
