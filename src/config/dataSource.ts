import { DataSource } from 'typeorm'
import Pet from '../entities/Pet'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './src/config/database.sqlite',
  entities: [Pet],
  synchronize: true,
})
