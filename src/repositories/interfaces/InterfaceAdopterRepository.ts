import Address from '../../entities/Address'
import type Adopter from '../../entities/Adopter'

export default interface IAdopterRepository {
  createAdopter(adopter: Adopter): Promise<void>
  findAdopterById(id: number): Promise<Adopter | null>
  listAdopters(): Promise<Adopter[]>
  updateAdopter(id: number, adopter: Adopter): Promise<Adopter>
  deleteAdopter(id: number): Promise<void>
  updateAddressAdopter(id: number, address: Address): Promise<Adopter>
}
