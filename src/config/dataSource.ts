import { DataSource } from 'typeorm'
import Pet from '../entities/Pet'
import Adopter from '../entities/Adopter'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/config/database.sqlite',
  entities: [Pet, Adopter],
  synchronize: true,
})
