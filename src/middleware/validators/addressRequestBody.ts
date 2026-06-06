import type { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'
import { pt } from 'yup-locale-pt'
import type Address from '../../entities/Address'
import validatorYup from '../../utils/validatorYup'

yup.setLocale(pt)

const schemaAddressBody: yup.ObjectSchema<Omit<Address, 'id'>> = yup.object({
  city: yup.string().defined().required(),
  state: yup.string().defined().required(),
})

const middlewareValidateAddressBody = async (req: Request, res: Response, next: NextFunction) => {
  validatorYup(schemaAddressBody, req, res, next)
}

export { middlewareValidateAddressBody }
