import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { GameMove } from "./GameMove"

@Entity()
export class GameSession {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, user => user.gameSessions)
    user: User

    @Column()
    status: string

    @Column()
    result: string

    @Column()
    createdAt: Date

    @OneToMany(() => GameMove, move => move.gameSession)
    moves: GameMove[]
}
