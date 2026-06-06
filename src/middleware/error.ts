import type { NextFunction, Request, Response } from 'express'
import { EnumHttpStatusCode } from '../enum/EnumHttpStatusCode'
import type { ErrorHandler } from '../utils/errorHandler'

export const errorMiddleware = (error: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode ?? EnumHttpStatusCode.INTERNAL_SERVER_ERROR
  const message = error.statusCode ? error.message : 'Internal Server Error'

  res.status(statusCode).json({ message })
  return next()
}
