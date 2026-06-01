import type { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { pt } from 'yup-locale-pt'
import type Address from '../../entities/Address'

yup.setLocale(pt)

const schemaAddressBody: yup.ObjectSchema<Omit<Address, 'id'>> = yup.object({
  city: yup.string().defined().required(),
  state: yup.string().defined().required(),
})

const middlewareValidateAddressBody = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schemaAddressBody.validate(req.body, { abortEarly: false })
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

export { middlewareValidateAddressBody }
