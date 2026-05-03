import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import type EnumSpecies from '../enum/EnumSpecies'

@Entity()
export default class Pet {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  name!: string
  @Column()
  species!: EnumSpecies
  @Column()
  dateOfBirth!: Date
  @Column()
  adoption!: boolean
}
