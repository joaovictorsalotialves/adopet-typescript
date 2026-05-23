import type { Request, Response } from 'express'
import Address from '../entities/Address'
import Adopter from '../entities/Adopter'
import type AdopterRepository from '../repositories/AdopterRepository'
import type { TypeRequestBodyAdopter, TypeRequestParamsAdopter, TypeResponseBodyAdopter } from '../types/TypeAdopter'

export default class AdopterController {
  constructor(private repository: AdopterRepository) {}

  async createAdopter(req: Request<{}, {}, TypeRequestBodyAdopter>, res: Response<TypeResponseBodyAdopter>) {
    const { name, password, address, pets, cellPhone, photo } = req.body as Adopter

    const newAdopter: Adopter = new Adopter(name, password, cellPhone, pets, photo, address)

    await this.repository.createAdopter(newAdopter)
    return res.status(201).json({ data: newAdopter })
  }

  async findAdopterById(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { id } = req.params

    const adopter = await this.repository.findAdopterById(Number(id))

    if (!adopter) {
      return res.status(404).json({ message: 'Adopter not found' })
    }

    return res.status(200).json({ data: { id: adopter.id, name: adopter.name, cellPhone: adopter.cellPhone } })
  }

  async listAdopters(
    _req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const adopters = await this.repository.listAdopters()
    const data = adopters.map(adopter => {
      return { id: adopter.id, name: adopter.name, cellPhone: adopter.cellPhone }
    })
    return res.status(200).json({ data })
  }

  async updateAdopter(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { id } = req.params
    const data = req.body as Adopter

    const adopter = await this.repository.findAdopterById(Number(id))

    if (!adopter) {
      return res.status(404).json({ message: 'Adopter not found' })
    }

    const updatedAdopter = await this.repository.updateAdopter(Number(id), data)

    return res.status(200).json({
      data: {
        id: updatedAdopter.id,
        name: updatedAdopter.name,
        cellPhone: updatedAdopter.cellPhone,
      },
    })
  }

  async deleteAdopter(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { id } = req.params

    const adopter = await this.repository.findAdopterById(Number(id))

    if (!adopter) {
      return res.status(404).json({ message: 'Adopter not found' })
    }

    await this.repository.deleteAdopter(Number(id))

    return res.status(200).json({ message: 'Adopter deleted successfully' })
  }

  async updateAddressAdopter(
    req: Request<TypeRequestParamsAdopter, {}, TypeRequestBodyAdopter>,
    res: Response<TypeResponseBodyAdopter>
  ) {
    const { id } = req.params
    const { city, state } = req.body.address as Address

    const address = new Address(city, state)

    const adopter = await this.repository.findAdopterById(Number(id))

    if (!adopter) {
      return res.status(404).json({ message: 'Adopter not found' })
    }

    const updatedAdopter = await this.repository.updateAddressAdopter(Number(id), address)

    return res.status(200).json({ data: updatedAdopter })
  }
}
