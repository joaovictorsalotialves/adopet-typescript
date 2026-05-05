import type Pet from '../../entities/Pet'

export default interface IPetRepository {
  createPet(pet: Pet): Promise<void>
  findPetById(id: number): Promise<Pet | null>
  listPets(): Promise<Pet[]>
  updatePet(id: number, pet: Pet): Promise<Pet>
  deletePet(id: number): Promise<void>
}
