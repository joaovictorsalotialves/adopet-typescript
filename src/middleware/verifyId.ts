import type { NextFunction, Request, Response } from 'express'
import { BadRequestError } from '../utils/errorHandler'

export const verifyIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const params = { ...req.params }

  for (const param in params) {
    if (!Number.isInteger(Number(params[param]))) {
      throw new BadRequestError(`Invalid ID: ${param}`)
    }
  }
}
