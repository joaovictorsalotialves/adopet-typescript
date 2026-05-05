import type { Request, Response } from 'express'
import Pet from '../entities/Pet'
import EnumSpecies from '../enum/EnumSpecies'
import type PetRepository from '../repositories/PetRepository'

let id = 0
function geraId() {
  id = id + 1
  return id
}

export default class PetController {
  constructor(private repository: PetRepository) {}

  async createPet(req: Request, res: Response) {
    const { adoption, species, dateOfBirth, name } = req.body as Pet

    if (!Object.values(EnumSpecies).includes(species)) {
      return res.status(400).json({ message: 'Invalid species' })
    }

    const newPet: Pet = new Pet()
    newPet.id = geraId()
    newPet.adoption = adoption
    newPet.species = species
    newPet.dateOfBirth = dateOfBirth
    newPet.name = name

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

    const updatedpet = await this.repository.updatePet(Number(id), data)

    return res.status(200).json(updatedpet)
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
