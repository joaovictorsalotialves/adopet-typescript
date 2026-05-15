import type { Request, Response } from 'express'
import Pet from '../entities/Pet'
import EnumSpecies from '../enum/EnumSpecies'
import type PetRepository from '../repositories/PetRepository'

export default class PetController {
  constructor(private repository: PetRepository) {}

  async createPet(req: Request, res: Response) {
    const { name, adoption, species, dateOfBirth } = req.body as Pet

    if (!Object.values(EnumSpecies).includes(species)) {
      return res.status(400).json({ message: 'Invalid species' })
    }

    const newPet: Pet = new Pet(name, species, dateOfBirth, adoption)

    await this.repository.createPet(newPet)
    return res.status(201).json(newPet)
  }

  async findPetById(req: Request, res: Response) {
    const { id } = req.params

    const pet = await this.repository.findPetById(Number(id))

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    return res.status(200).json(pet)
  }

  async listPets(_req: Request, res: Response) {
    const pets = await this.repository.listPets()
    return res.status(200).json(pets)
  }

  async updatePet(req: Request, res: Response) {
    const { id } = req.params
    const data = req.body as Pet

    const pet = await this.repository.findPetById(Number(id))

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    if (!Object.values(EnumSpecies).includes(data.species)) {
      return res.status(400).json({ message: 'Invalid species' })
    }

    const updatedPet = await this.repository.updatePet(Number(id), data)

    return res.status(200).json(updatedPet)
  }

  async deletePet(req: Request, res: Response) {
    const { id } = req.params

    const pet = await this.repository.findPetById(Number(id))

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    await this.repository.deletePet(Number(id))

    return res.status(200).json({ message: 'Pet deleted successfully' })
  }
}
