import type { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { pt } from 'yup-locale-pt'
import type { TypeRequestBodyShelter } from '../../types/TypesShelter'
import validatorYup from '../../utils/validatorYup'

yup.setLocale(pt)

const schemaShelterBody: yup.ObjectSchema<Omit<TypeRequestBodyShelter, 'address'>> = yup.object({
  name: yup.string().defined().required(),
  cellPhone: yup
    .string()
    .defined()
    .required()
    .matches(/^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm, 'Invalid cell phone format'),
  password: yup
    .string()
    .defined()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
      'Password must be 8-16 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  email: yup.string().email().defined().required(),
})

const middlewareValidateShelterBody = async (req: Request, res: Response, next: NextFunction) => {
  validatorYup(schemaShelterBody, req, res, next)
}

export { middlewareValidateShelterBody }
