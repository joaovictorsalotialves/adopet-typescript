import type Adopter from '../entities/Adopter'

type TypeRequestBodyAdopter = Omit<Adopter, 'id'>
type TypeRequestParamsAdopter = { id?: string }

type TypeResponseBodyAdopter = {
  data?: Pick<Adopter, 'id' | 'name' | 'cellPhone'> | Pick<Adopter, 'id' | 'name' | 'cellPhone'>[]
  message?: string
}

export type { TypeRequestBodyAdopter, TypeRequestParamsAdopter, TypeResponseBodyAdopter }
