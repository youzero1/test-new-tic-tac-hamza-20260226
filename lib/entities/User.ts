import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Order } from "./Order"
import { GameSession } from "./GameSession"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @OneToMany(() => Order, order => order.user)
    orders: Order[]

    @OneToMany(() => GameSession, gameSession => gameSession.user)
    gameSessions: GameSession[]
}
