import type { Repository } from 'typeorm'
import Address from '../entities/Address'
import type Adopter from '../entities/Adopter'
import { NotFoundError } from '../utils/errorHandler'
import type IAdopterRepository from './interfaces/InterfaceAdopterRepository'

export default class AdopterRepository implements IAdopterRepository {
  private repository: Repository<Adopter>

  constructor(repository: Repository<Adopter>) {
    this.repository = repository
  }

  async createAdopter(adopter: Adopter): Promise<void> {
    await this.repository.save(adopter)
  }

  async findAdopterById(id: number): Promise<Adopter | null> {
    return await this.repository.findOne({ where: { id } })
  }

  async listAdopters(): Promise<Adopter[]> {
    return await this.repository.find()
  }

  async updateAdopter(id: number, adopter: Adopter): Promise<Adopter> {
    await this.repository.update(id, adopter)
    return (await this.findAdopterById(id)) as Adopter
  }

  async deleteAdopter(id: number): Promise<void> {
    await this.repository.delete(id)
  }

  async updateAddressAdopter(id: number, address: Address): Promise<Adopter> {
    const adopter = await this.findAdopterById(id)

    if (!adopter) {
      throw new NotFoundError('Adopter not found')
    }

    const newAddress = new Address(address.city, address.state)
    adopter.address = newAddress
    await this.repository.save(adopter)

    return (await this.findAdopterById(id)) as Adopter
  }
}
