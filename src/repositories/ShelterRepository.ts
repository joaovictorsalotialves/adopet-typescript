import type { Repository } from 'typeorm'
import Address from '../entities/Address'
import type Shelter from '../entities/Shelter'
import { BadRequestError, NotFoundError } from '../utils/errorHandler'
import type IShelterRepository from './interfaces/InterfaceShelterRepository'

export default class ShelterRepository implements IShelterRepository {
  private repository: Repository<Shelter>

  constructor(repository: Repository<Shelter>) {
    this.repository = repository
  }

  async createShelter(shelter: Shelter): Promise<void> {
    const existingShelter = await this.findShelterByEmail(shelter.email)

    if (existingShelter) {
      throw new BadRequestError('Shelter with this email already exists')
    }

    await this.repository.save(shelter)
  }

  async findShelterByEmail(email: string): Promise<Shelter | null> {
    return await this.repository.findOne({ where: { email } })
  }

  async findShelterById(id: number): Promise<Shelter | null> {
    return await this.repository.findOne({ where: { id } })
  }

  async listShelters(): Promise<Shelter[]> {
    return await this.repository.find()
  }

  async updateShelter(id: number, shelter: Shelter): Promise<Shelter> {
    await this.repository.update(id, shelter)
    return (await this.findShelterById(id)) as Shelter
  }

  async deleteShelter(id: number): Promise<void> {
    await this.repository.delete(id)
  }

  async updateAddressShelter(id: number, address: Address): Promise<Shelter> {
    const shelter = await this.findShelterById(id)

    if (!shelter) {
      throw new NotFoundError('Shelter not found')
    }

    const newAddress = new Address(address.city, address.state)
    shelter.address = newAddress
    await this.repository.save(shelter)

    return (await this.findShelterById(id)) as Shelter
  }
}
