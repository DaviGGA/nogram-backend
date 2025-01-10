import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { PostEntity } from "./post-entity"
import { UserEntity } from "../../user/entities/user-entity"

@Entity({name: "comment"})
export class CommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 256})
    text: string

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity
    
    @ManyToOne(() => PostEntity)
    @JoinColumn()
    post: PostEntity

}