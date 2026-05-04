import type { Request, Response } from 'express'
import Pet from '../entities/Pet'
import EnumSpecies from '../enum/EnumSpecies'
import type PetRepository from '../repositories/PetRepository'
import type TypePet from '../types/TypePet'

const listPets: TypePet[] = []

let id = 0
function geraId() {
  id = id + 1
  return id
}

export default class PetController {
  constructor(private repository: PetRepository) {}

  createPet(req: Request, res: Response) {
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

    this.repository.createPet(newPet)
    return res.status(201).json(newPet)
  }

  listPets(_req: Request, res: Response) {
    return res.status(200).json(listPets)
  }

  updatePet(req: Request, res: Response) {
    const { id } = req.params
    const { adoption, species, dateOfBirth, name } = req.body as Pet

    const pet = listPets.find(pet => pet.id === Number(id))

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    pet.name = name
    pet.dateOfBirth = dateOfBirth
    pet.species = species
    pet.adoption = adoption

    return res.status(200).json(pet)
  }

  deletePet(req: Request, res: Response) {
    const { id } = req.params

    const pet = listPets.find(pet => pet.id === Number(id))

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    const index = listPets.indexOf(pet)
    listPets.splice(index, 1)
    return res.status(200).json({ message: 'Pet deleted successfully' })
  }
}
