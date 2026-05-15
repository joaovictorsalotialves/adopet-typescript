import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export default class Address {
  @PrimaryColumn()
  id!: number
  @Column()
  city: string
  @Column()
  state: string

  constructor(city: string, state: string) {
    this.city = city
    this.state = state
  }
}
