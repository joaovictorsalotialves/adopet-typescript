import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import type EnumSpecies from '../enum/EnumSpecies'
import Adopter from './Adopter'
import EnumSize from '../enum/EnumSize'

@Entity()
export default class Pet {
  @PrimaryGeneratedColumn()
  id!: number
  @Column()
  name: string
  @Column()
  species: EnumSpecies
  @Column({nullable: true})
  size?: EnumSize
  @Column()
  dateOfBirth: Date
  @Column()
  adoption: boolean
  @ManyToOne(() => Adopter, (adopter) => adopter.pets)
  adopter!: Adopter

  constructor(name: string, species: EnumSpecies, dateOfBirth: Date, adoption: boolean, size?: EnumSize) {
    this.name = name
    this.species = species
    this.dateOfBirth = dateOfBirth
    this.adoption = adoption
    this.size = size
  }
}
