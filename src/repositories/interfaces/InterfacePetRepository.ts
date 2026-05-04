import type Pet from '../../entities/Pet'

export default interface IPetRepository {
  createPet(pet: Pet): Promise<void>
  listPets(): Promise<Pet[]>
  updatePet(id: number, pet: Pet): Promise<void>
  deletePet(id: number): Promise<void>
}
