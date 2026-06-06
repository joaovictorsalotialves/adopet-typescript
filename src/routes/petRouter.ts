import express, { type RequestHandler } from 'express'
import { AppDataSource } from '../config/dataSource'
import PetController from '../controllers/PetController'
import { middlewareValidatePetBody } from '../middleware/validators/petRequestBody'
import { verifyIdMiddleware } from '../middleware/verifyId'
import PetRepository from '../repositories/PetRepository'

const router = express.Router()

const petRepository = new PetRepository(AppDataSource.getRepository('Pet'), AppDataSource.getRepository('Adopter'))
const petController = new PetController(petRepository)

const validatePetBody: RequestHandler = (req, res, next) => middlewareValidatePetBody(req, res, next)

router.post('/', validatePetBody, (req, res) => petController.createPet(req, res))
router.get('/', (req, res) => petController.listPets(req, res))
router.get('/size', verifyIdMiddleware, (req, res) => petController.searchPetsBySize(req, res))
router.get('/filter', verifyIdMiddleware, (req, res) => petController.searchPetsByGenericField(req, res))
router.put('/:id', verifyIdMiddleware, (req, res) => petController.updatePet(req, res))
router.put('/:petId/:adopterId', verifyIdMiddleware, (req, res) => petController.addPetToAdopter(req, res))
router.delete('/:id', verifyIdMiddleware, (req, res) => petController.deletePet(req, res))

export default router
