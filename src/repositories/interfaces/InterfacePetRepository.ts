import type Pet from '../../entities/Pet'

export default interface IPetRepository {
  createPet(pet: Pet): void
  listPets(): Pet[]
  updatePet(id: number, pet: Pet): void
  deletePet(id: number): void
}
