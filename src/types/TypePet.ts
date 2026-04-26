import type EnumSpecies from '../enum/EnumSpecies'

type TypePet = {
  id: number
  name: string
  species: EnumSpecies
  adoption: boolean
  dateOfBirth: Date
}

export default TypePet
