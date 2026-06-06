import type { NextFunction, Request, Response } from 'express'
import type * as yup from 'yup'

const validatorYup = (schema: yup.Schema<unknown>, req: Request, res: Response, next: NextFunction) => {
  try {
    schema.validateSync(req.body, { abortEarly: false })
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

export default validatorYup
