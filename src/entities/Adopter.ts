import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import Address from './Address'
import Pet from './Pet'

@Entity()
export default class Adopter {
  @PrimaryColumn()
  id!: number
  @Column()
  name: string
  @Column()
  password: string
  @Column()
  cellPhone: string
  @Column({nullable: true})
  photo?: string
  @OneToOne(() => Address, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
  address?: Address
  @OneToMany(() => Pet, (pet) => pet.adopter)
  pets!: Pet[]

  constructor(name: string, password: string, cellPhone: string, pets: Pet[], photo?: string, address?: Address) {
    this.name = name
    this.password = password
    this.cellPhone = cellPhone
    this.pets = pets
    this.photo = photo
    this.address = address
  }
}
