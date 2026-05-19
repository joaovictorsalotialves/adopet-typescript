import type Adopter from '../entities/Adopter'

type TypeRequestBodyAdopter = Omit<Adopter, 'id'>
type TypeResponseBodyAdopter = {
  data?: Pick<Adopter, 'id' | 'name' | 'cellPhone'>
  message?: string
}

export type { TypeRequestBodyAdopter, TypeResponseBodyAdopter }
