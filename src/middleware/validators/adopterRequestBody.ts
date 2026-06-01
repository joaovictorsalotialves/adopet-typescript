import type { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import type { TypeRequestBodyAdopter } from '../../types/TypesAdopter'

const schemaAdopterBody: yup.ObjectSchema<Omit<TypeRequestBodyAdopter, 'address'>> = yup.object({
  name: yup.string().defined().required(),
  cellPhone: yup.string().defined().required(),
  password: yup.string().defined().required().min(6),
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
