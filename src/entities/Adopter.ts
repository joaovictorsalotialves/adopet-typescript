import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import Address from './Address'

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

  constructor(name: string, password: string, cellPhone: string, photo?: string, address?: Address) {
    this.name = name
    this.password = password
    this.cellPhone = cellPhone
    this.photo = photo
    this.address = address
  }
}
