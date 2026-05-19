import type { Repository } from 'typeorm'
import type Adopter from '../entities/Adopter'
import type Pet from '../entities/Pet'
import type EnumSize from '../enum/EnumSize'
import type IPetRepository from './interfaces/InterfacePetRepository'

export default class PetRepository implements IPetRepository {
  private petRepository: Repository<Pet>
  private adopterRepository: Repository<Adopter>

  constructor(petRepository: Repository<Pet>, adopterRepository: Repository<Adopter>) {
    this.petRepository = petRepository
    this.adopterRepository = adopterRepository
  }

  async createPet(pet: Pet): Promise<void> {
    await this.petRepository.save(pet)
  }

  async findPetById(id: number): Promise<Pet | null> {
    return await this.petRepository.findOne({ where: { id } })
  }

  async listPets(): Promise<Pet[]> {
    return await this.petRepository.find()
  }

  async searchPetsBySize(size: EnumSize): Promise<Pet[]> {
    return await this.petRepository.find({ where: { size } })
  }

  async searchPetsByGenericField<T extends keyof Pet>(field: T, value: Pet[T]): Promise<Pet[]> {
    return await this.petRepository.find({ where: { [field]: value } })
  }

  async updatePet(id: number, pet: Pet): Promise<Pet> {
    await this.petRepository.update(id, pet)
    return (await this.findPetById(id)) as Pet
  }

  async deletePet(id: number): Promise<void> {
    await this.petRepository.delete(id)
  }

  async addPetToAdopter(adopterId: number, petId: number): Promise<void> {
    const adopter = await this.adopterRepository.findOne({ where: { id: adopterId } })

    if (!adopter) {
      throw new Error('Adopter not found')
    }

    const pet = await this.findPetById(Number(petId))

    if (!pet) {
      throw new Error('Pet not found')
    }

    pet.adopter = adopter
    pet.adoption = true

    await this.petRepository.save(pet)
  }
}
