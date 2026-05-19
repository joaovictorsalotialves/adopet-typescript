import type { Request, Response } from 'express'
import Pet from '../entities/Pet'
import EnumSize from '../enum/EnumSize'
import EnumSpecies from '../enum/EnumSpecies'
import type PetRepository from '../repositories/PetRepository'

export default class PetController {
  constructor(private repository: PetRepository) {}

  async createPet(req: Request, res: Response) {
    const { name, adoption, species, size, dateOfBirth } = req.body as Pet

    if (!Object.values(EnumSpecies).includes(species)) {
      return res.status(400).json({ message: 'Invalid species' })
    }

    if (size && !(size in EnumSize)) {
      return res.status(400).json({ message: 'Invalid size' })
    }

    const newPet: Pet = new Pet(name, species, dateOfBirth, adoption, size)

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

  async searchPetsBySize(req: Request, res: Response) {
    const { size } = req.query

    if (!Object.values(EnumSize).includes(size as EnumSize)) {
      return res.status(400).json({ message: 'Invalid size' })
    }

    const pets = await this.repository.searchPetsBySize(size as EnumSize)
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

  async addPetToAdopter(req: Request, res: Response) {
    const { adopterId, petId } = req.params

    await this.repository.addPetToAdopter(Number(adopterId), Number(petId))
    return res.status(200).json({ message: 'Pet added to adopter successfully' })
  }
}
