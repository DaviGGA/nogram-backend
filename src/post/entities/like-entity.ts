import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, ManyToMany, ManyToOne } from "typeorm"
import { PostEntity } from "./post-entity"
import { UserEntity } from "../../user/entities/user-entity"

@Entity({name: "like"})
export class LikeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => PostEntity, post => post.likes)
    @JoinColumn()
    post: PostEntity

    @OneToOne(() => UserEntity)
    @JoinColumn()
    liking_user: UserEntity

}