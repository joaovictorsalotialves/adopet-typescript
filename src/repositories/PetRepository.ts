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

  async listPets(): Promise<Pet[]> {
    return await this.repository.find()
  }

  async updatePet(id: number, pet: Pet): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async deletePet(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
