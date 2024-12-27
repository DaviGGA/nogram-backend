import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { UserEntity } from "./user-entity"

@Entity({name: "profile"})
export class ProfileEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 36, nullable: false})
    first_name: string

    @Column({length: 36, nullable: false})
    surname: string

    @Column({length: 24, unique: true})
    username: string

    @Column({length: 36, nullable: true})
    image: string

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity
}