import type { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { pt } from 'yup-locale-pt'
import EnumSize from '../../enum/EnumSize'
import EnumSpecies from '../../enum/EnumSpecies'
import type { TypeRequestBodyPet } from '../../types/TypesPet'
import validatorYup from '../../utils/validatorYup'

yup.setLocale(pt)

const schemaPetBody: yup.ObjectSchema<Omit<TypeRequestBodyPet, 'adopter'>> = yup.object({
  name: yup.string().defined().required(),
  species: yup.string().oneOf(Object.values(EnumSpecies)).defined().required(),
  size: yup.string().oneOf(Object.values(EnumSize)).defined().required(),
  dateOfBirth: yup.date().defined().required(),
  adoption: yup.boolean().defined().required(),
})

const middlewareValidatePetBody = async (req: Request, res: Response, next: NextFunction) => {
  validatorYup(schemaPetBody, req, res, next)
}

export { middlewareValidatePetBody }
