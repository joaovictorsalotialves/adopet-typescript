import type { Request, Response } from 'express'
import Address from '../entities/Address'
import Shelter from '../entities/Shelter'
import { EnumHttpStatusCode } from '../enum/EnumHttpStatusCode'
import type ShelterRepository from '../repositories/ShelterRepository'
import type { TypeRequestBodyShelter, TypeRequestParamsShelter, TypeResponseBodyShelter } from '../types/TypesShelter'

export default class ShelterController {
  constructor(private repository: ShelterRepository) {}

  async createShelter(
    req: Request<TypeRequestParamsShelter, {}, TypeRequestBodyShelter>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const { name, password, address, cellPhone, email } = req.body as Shelter

    const newShelter: Shelter = new Shelter(name, password, email, cellPhone, address)

    await this.repository.createShelter(newShelter)
    return res.status(EnumHttpStatusCode.CREATED).json({ data: newShelter })
  }

  async findShelterById(
    req: Request<TypeRequestParamsShelter, {}, TypeRequestBodyShelter>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const { id } = req.params

    const shelter = await this.repository.findShelterById(Number(id))

    if (!shelter) {
      return res.status(EnumHttpStatusCode.NOT_FOUND).json({ message: 'Shelter not found' })
    }

    return res.status(EnumHttpStatusCode.OK).json({
      data: {
        id: shelter.id,
        name: shelter.name,
        cellPhone: shelter.cellPhone,
        email: shelter.email,
        address: shelter.address !== null ? shelter.address : undefined,
      },
    })
  }

  async listShelters(
    _req: Request<TypeRequestParamsShelter, {}, TypeRequestBodyShelter>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const shelters = await this.repository.listShelters()
    const data = shelters.map(shelter => {
      return {
        id: shelter.id,
        name: shelter.name,
        email: shelter.email,
        cellPhone: shelter.cellPhone,
        address: shelter.address !== null ? shelter.address : undefined,
      }
    })
    return res.status(EnumHttpStatusCode.OK).json({ data })
  }

  async updateShelter(
    req: Request<TypeRequestParamsShelter, {}, TypeRequestBodyShelter>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const { id } = req.params
    const data = req.body as Shelter

    const shelter = await this.repository.findShelterById(Number(id))

    if (!shelter) {
      return res.status(EnumHttpStatusCode.NOT_FOUND).json({ message: 'Shelter not found' })
    }

    const updatedShelter = await this.repository.updateShelter(Number(id), data)

    return res.status(EnumHttpStatusCode.OK).json({
      data: {
        id: updatedShelter.id,
        name: updatedShelter.name,
        cellPhone: updatedShelter.cellPhone,
        email: updatedShelter.email,
        address: updatedShelter.address !== null ? updatedShelter.address : undefined,
      },
    })
  }

  async deleteShelter(
    req: Request<TypeRequestParamsShelter, {}, TypeRequestBodyShelter>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const { id } = req.params

    const shelter = await this.repository.findShelterById(Number(id))

    if (!shelter) {
      return res.status(EnumHttpStatusCode.NOT_FOUND).json({ message: 'Shelter not found' })
    }

    await this.repository.deleteShelter(Number(id))

    return res.status(EnumHttpStatusCode.OK).json({ message: 'Shelter deleted successfully' })
  }

  async updateAddressShelter(
    req: Request<TypeRequestParamsShelter, {}, Address>,
    res: Response<TypeResponseBodyShelter>
  ) {
    const { id } = req.params
    const { city, state } = req.body

    const address = new Address(city, state)

    const shelter = await this.repository.findShelterById(Number(id))

    if (!shelter) {
      return res.status(EnumHttpStatusCode.NOT_FOUND).json({ message: 'Shelter not found' })
    }

    const updatedShelter = await this.repository.updateAddressShelter(Number(id), address)

    return res.status(EnumHttpStatusCode.OK).json({ data: updatedShelter })
  }
}
