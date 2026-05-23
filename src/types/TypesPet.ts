import type Pet from '../entities/Pet'

type TypeRequestBodyPet = Omit<Pet, 'id'>
type TypeRequestParamsPet = { id?: string; adopterId?: string; petId?: string }

type TypeResponseBodyPet = {
  data?: Pick<Pet, 'id' | 'name' | 'species' | 'size'> | Pick<Pet, 'id' | 'name' | 'species' | 'size'>[]
  message?: string
}

export type { TypeRequestBodyPet, TypeRequestParamsPet, TypeResponseBodyPet }
