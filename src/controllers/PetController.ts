import type { Request, Response } from 'express'
import type TypePet from '../types/TypePet'

const listPets: TypePet[] = []

export default class PetController {
  createPet(req: Request, res: Response) {
    const newPet = req.body as TypePet
    listPets.push(newPet)
    return res.status(201).json(newPet)
  }
}
