import { NextApiRequest, NextApiResponse } from 'next'
import { AppDataSource } from '../../lib/data-source'
import { GameSession } from '../../lib/entities/GameSession'
import { GameMove } from '../../lib/entities/GameMove'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await AppDataSource.initialize()

    if (req.method === 'GET') {
        const gameSessionRepository = AppDataSource.getRepository(GameSession)
        const sessions = await gameSessionRepository.find({ relations: ['moves'] })
        res.status(200).json(sessions)
    } else if (req.method === 'POST') {
        const { result, status, moves } = req.body
        const gameSessionRepository = AppDataSource.getRepository(GameSession)
        const gameMoveRepository = AppDataSource.getRepository(GameMove)

        const session = new GameSession()
        session.status = status
        session.result = result
        session.createdAt = new Date()
        session.user = null

        const savedSession = await gameSessionRepository.save(session)

        if (moves && Array.isArray(moves)) {
            for (let i = 0; i < moves.length; i++) {
                if (moves[i]) {
                    const move = new GameMove()
                    move.position = i
                    move.player = moves[i]
                    move.moveOrder = i
                    move.gameSession = savedSession
                    await gameMoveRepository.save(move)
                }
            }
        }

        res.status(201).json(savedSession)
    } else {
        res.status(405).json({ message: 'Method not allowed' })
    }
}
