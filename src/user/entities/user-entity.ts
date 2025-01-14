import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, OneToOne } from "typeorm"
import { Profile } from "../models/profile";
import { ProfileEntity } from "./profile-entity";

@Entity({name: "user"})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({length:"36", unique: true})
    email: string

    @Column({length: "100"})
    password: string

    @OneToOne(() => ProfileEntity, {nullable: true})
    @JoinColumn()
    profile: ProfileEntity | null; 
}