import { DataSource } from 'typeorm'
import Address from '../entities/Address'
import Adopter from '../entities/Adopter'
import Pet from '../entities/Pet'
import Shelter from '../entities/Shelter'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/config/database.sqlite',
  entities: [Pet, Adopter, Address, Shelter],
  synchronize: true,
})
