import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from 'typeorm'
import { createPasswordHash } from '../utils/createPassordHash'
import Address from './Address'
import Pet from './Pet'

@Entity()
export default class Shelter {
  @PrimaryColumn()
  id!: number
  @Column()
  name: string
  @Column()
  password: string
  @Column({ unique: true })
  email: string
  @Column({ unique: true })
  cellPhone: string
  @OneToOne(() => Address, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
  address?: Address
  @OneToMany(
    () => Pet,
    pet => pet.shelter
  )
  pets!: Pet[]

  constructor(name: string, password: string, email: string, cellPhone: string, address?: Address) {
    this.name = name
    this.password = password
    this.email = email
    this.cellPhone = cellPhone
    this.address = address
  }

  @BeforeInsert()
  @BeforeUpdate()
  private async criptographPassword() {
    this.password = createPasswordHash(this.password)
  }
}
