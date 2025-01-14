import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { UserEntity } from "../../user/entities/user-entity"
import { ChatEntity } from "./chat-entity"

@Entity({name: "message"})
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    sender: UserEntity
    
    @ManyToOne(() => ChatEntity)
    @JoinColumn()
    chat: ChatEntity

    @Column({length: 256})
    content: string

    @CreateDateColumn()
    created_at: Date
}