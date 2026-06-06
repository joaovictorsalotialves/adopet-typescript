import type { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { pt } from 'yup-locale-pt'
import type { TypeRequestBodyAdopter } from '../../types/TypesAdopter'

yup.setLocale(pt)

const schemaAdopterBody: yup.ObjectSchema<Omit<TypeRequestBodyAdopter, 'address'>> = yup.object({
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
  photo: yup.string().optional(),
})

const middlewareValidateAdopterBody = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schemaAdopterBody.validate(req.body, { abortEarly: false })
    return next()
  } catch (error) {
    const yupErrors = error as yup.ValidationError

    const validationErrors: Record<string, string> = {}

    yupErrors.inner.forEach(error => {
      if (!error.path) return
      validationErrors[error.path] = error.message
    })

    return res.status(400).json({ message: validationErrors })
  }
}

export { middlewareValidateAdopterBody }
