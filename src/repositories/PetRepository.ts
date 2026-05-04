import type { Repository } from 'typeorm'
import type Pet from '../entities/Pet'
import type IPetRepository from './interfaces/InterfacePetRepository'

export default class PetRepository implements IPetRepository {
  private repository: Repository<Pet>

  constructor(repository: Repository<Pet>) {
    this.repository = repository
  }

  createPet(pet: Pet): void {
    this.repository.save(pet)
  }

  listPets(): Pet[] {
    throw new Error('Method not implemented.')
  }

  updatePet(id: number, pet: Pet): void {
    throw new Error('Method not implemented.')
  }

  deletePet(id: number): void {
    throw new Error('Method not implemented.')
  }
}
