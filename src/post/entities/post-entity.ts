import { UserEntity } from "../../user/entities/user-entity"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { LikeEntity } from "./like-entity"
import { CommentEntity } from "./comment-entity"
import { comment } from "postcss"

@Entity({name: "post"})
export class PostEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 36})
    image: string

    @Column({length: 256, nullable: true})
    description: string
    
    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity

    @OneToMany(() => LikeEntity, like => like.post)
    likes: LikeEntity[]

    @OneToMany(() => CommentEntity, comment => comment.post)
    comments: CommentEntity[]

}