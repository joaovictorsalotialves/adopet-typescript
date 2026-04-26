import type EnumSpecies from '../enum/EnumSpecies'

type TypePet = {
  id: number
  name: string
  species: EnumSpecies
  adoption: boolean
  age: number
}

export default TypePet
