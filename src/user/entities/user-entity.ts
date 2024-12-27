import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity({name: "user"})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length:"36", unique: true})
    email: string

    @Column({length: "100"})
    password: string
}