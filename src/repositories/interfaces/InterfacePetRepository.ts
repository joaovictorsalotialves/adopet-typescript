import type Pet from '../../entities/Pet'
import type EnumSize from '../../enum/EnumSize'

export default interface IPetRepository {
  createPet(pet: Pet): Promise<void>
  findPetById(id: number): Promise<Pet | null>
  searchPetsBySize(size: EnumSize): Promise<Pet[]>
  listPets(): Promise<Pet[]>
  updatePet(id: number, pet: Pet): Promise<Pet>
  deletePet(id: number): Promise<void>
}
