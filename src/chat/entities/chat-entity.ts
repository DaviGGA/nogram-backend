import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, CreateDateColumn, OneToMany, ManyToOne } from "typeorm"
import { UserEntity } from "../../user/entities/user-entity"
import { MessageEntity } from "./message-entity"

@Entity({name: "chat"})
export class ChatEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user1: UserEntity
    
    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user2: UserEntity

    @OneToMany(() => MessageEntity, message => message.chat)
    messages: MessageEntity[]

}