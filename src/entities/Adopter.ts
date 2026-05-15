import { Column, Entity, PrimaryColumn } from 'typeorm'

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
  @Column()
  photo: string
  @Column()
  address: string

  constructor(name: string, password: string, cellPhone: string, photo: string, address: string) {
    this.name = name
    this.password = password
    this.cellPhone = cellPhone
    this.photo = photo
    this.address = address
  }
}
