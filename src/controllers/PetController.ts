import type { Request, Response } from 'express'
import Pet from '../entities/Pet'
import EnumSize from '../enum/EnumSize'
import EnumSpecies from '../enum/EnumSpecies'
import type PetRepository from '../repositories/PetRepository'
import type { TypeRequestBodyPet, TypeRequestParamsPet, TypeResponseBodyPet } from '../types/TypesPet'

export default class PetController {
  constructor(private repository: PetRepository) {}

  async createPet(req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, res: Response<TypeResponseBodyPet>) {
    const { name, adoption, species, size, dateOfBirth } = req.body as Pet

    const newPet: Pet = new Pet(name, species, dateOfBirth, adoption, size)

    await this.repository.createPet(newPet)
    return res.status(201).json({
      data: {
        id: newPet.id,
        name: newPet.name,
        species: newPet.species,
        size: newPet.size !== null ? newPet.size : undefined,
      },
    })
  }

  async findPetById(req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, res: Response<TypeResponseBodyPet>) {
    const { id } = req.params

    const pet = await this.repository.findPetById(Number(id))

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    return res.status(200).json({
      data: {
        id: pet.id,
        name: pet.name,
        species: pet.species,
        size: pet.size !== null ? pet.size : undefined,
      },
    })
  }

  async listPets(_req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, res: Response<TypeResponseBodyPet>) {
    const pets = await this.repository.listPets()
    const data = pets.map(pet => {
      return { id: pet.id, name: pet.name, species: pet.species, size: pet.size !== null ? pet.size : undefined }
    })
    return res.status(200).json({ data })
  }

  async searchPetsBySize(
    req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>,
    res: Response<TypeResponseBodyPet>
  ) {
    const { size } = req.query

    if (!Object.values(EnumSize).includes(size as EnumSize)) {
      return res.status(400).json({ message: 'Invalid size' })
    }

    const pets = await this.repository.searchPetsBySize(size as EnumSize)

    const data = pets.map(pet => {
      return { id: pet.id, name: pet.name, species: pet.species, size: pet.size }
    })
    return res.status(200).json({ data })
  }

  async searchPetsByGenericField(
    req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>,
    res: Response<TypeResponseBodyPet>
  ) {
    const { field, value } = req.query

    if (!field || !value) {
      return res.status(400).json({ message: 'Field and value are required' })
    }

    const pets = await this.repository.searchPetsByGenericField(field as keyof Pet, value as Pet[keyof Pet])

    const data = pets.map(pet => {
      return { id: pet.id, name: pet.name, species: pet.species, size: pet.size }
    })
    return res.status(200).json({ data })
  }

  async updatePet(req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, res: Response<TypeResponseBodyPet>) {
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

    return res.status(200).json({
      data: {
        id: updatedPet.id,
        name: updatedPet.name,
        species: updatedPet.species,
        size: updatedPet.size,
      },
    })
  }

  async deletePet(req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>, res: Response<TypeResponseBodyPet>) {
    const { id } = req.params

    const pet = await this.repository.findPetById(Number(id))

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' })
    }

    await this.repository.deletePet(Number(id))

    return res.status(200).json({ message: 'Pet deleted successfully' })
  }

  async addPetToAdopter(
    req: Request<TypeRequestParamsPet, {}, TypeRequestBodyPet>,
    res: Response<TypeResponseBodyPet>
  ) {
    const { adopterId, petId } = req.params

    await this.repository.addPetToAdopter(Number(adopterId), Number(petId))
    return res.status(200).json({ message: 'Pet added to adopter successfully' })
  }
}
