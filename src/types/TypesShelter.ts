import type Shelter from '../entities/Shelter'

type TypeRequestBodyShelter = Omit<Shelter, 'id' | 'pets'>
type TypeRequestParamsShelter = { id?: string }

type TypeResponseBodyShelter = {
  data?:
    | Pick<Shelter, 'id' | 'name' | 'email' | 'cellPhone' | 'address'>
    | Pick<Shelter, 'id' | 'name' | 'email' | 'cellPhone' | 'address'>[]
  message?: string | Record<string, string>
}

export type { TypeRequestBodyShelter, TypeRequestParamsShelter, TypeResponseBodyShelter }
