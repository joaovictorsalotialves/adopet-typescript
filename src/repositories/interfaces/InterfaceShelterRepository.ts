import type Address from '../../entities/Address'
import type Shelter from '../../entities/Shelter'

export default interface IShelterRepository {
  createShelter(shelter: Shelter): Promise<void>
  findShelterById(id: number): Promise<Shelter | null>
  findShelterByEmail(email: string): Promise<Shelter | null>
  listShelters(): Promise<Shelter[]>
  updateShelter(id: number, shelter: Shelter): Promise<Shelter>
  deleteShelter(id: number): Promise<void>
  updateAddressShelter(id: number, address: Address): Promise<Shelter>
}
