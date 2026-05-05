import type { Repository } from 'typeorm'
import type Pet from '../entities/Pet'
import type IPetRepository from './interfaces/InterfacePetRepository'

export default class PetRepository implements IPetRepository {
  private repository: Repository<Pet>

  constructor(repository: Repository<Pet>) {
    this.repository = repository
  }

  async createPet(pet: Pet): Promise<void> {
    await this.repository.save(pet)
  }

  async findPetById(id: number): Promise<Pet | null> {
    return await this.repository.findOne({ where: { id } })
  }

  async listPets(): Promise<Pet[]> {
    return await this.repository.find()
  }

  async updatePet(id: number, pet: Pet): Promise<Pet> {
    await this.repository.update(id, pet)
    return (await this.findPetById(id)) as Pet
  }

  async deletePet(id: number): Promise<void> {
    await this.repository.delete(id)
  }
}
