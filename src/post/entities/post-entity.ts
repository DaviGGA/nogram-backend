import { UserEntity } from "../../user/entities/user-entity"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm"

@Entity({name: "post"})
export class PostEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 36})
    image: string

    @Column({length: 256, nullable: true})
    description: string
    
    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity
}