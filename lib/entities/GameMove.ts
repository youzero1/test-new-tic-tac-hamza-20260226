import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { GameSession } from "./GameSession"

@Entity()
export class GameMove {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => GameSession, gameSession => gameSession.moves)
    gameSession: GameSession

    @Column()
    position: number

    @Column()
    player: string

    @Column()
    moveOrder: number
}
