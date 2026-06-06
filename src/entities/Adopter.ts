import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { createPasswordHash } from '../utils/createPassordHash'
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
  @Column({ nullable: true })
  photo?: string
  @OneToOne(() => Address, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
  address?: Address
  @OneToMany(
    () => Pet,
    pet => pet.adopter
  )
  pets!: Pet[]

  constructor(name: string, password: string, cellPhone: string, photo?: string, address?: Address) {
    this.name = name
    this.password = password
    this.cellPhone = cellPhone
    this.photo = photo
    this.address = address
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async criptographPassword(password: string) {
    this.password = createPasswordHash(this.password)
  }
}
