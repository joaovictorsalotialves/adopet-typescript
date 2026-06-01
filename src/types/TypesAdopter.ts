import type Adopter from '../entities/Adopter'

type TypeRequestBodyAdopter = Omit<Adopter, 'id' | 'pets'>
type TypeRequestParamsAdopter = { id?: string }

type TypeResponseBodyAdopter = {
  data?:
    | Pick<Adopter, 'id' | 'name' | 'cellPhone' | 'address'>
    | Pick<Adopter, 'id' | 'name' | 'cellPhone' | 'address'>[]
  message?: string | Record<string, string>
}

export type { TypeRequestBodyAdopter, TypeRequestParamsAdopter, TypeResponseBodyAdopter }
