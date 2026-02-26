import React, { useState, useEffect } from 'react'
import TicTacToeBoard from '../components/TicTacToeBoard'
import GameHistory from '../components/GameHistory'

const GamePage: React.FC = () => {
    const [gameState, setGameState] = useState<string[]>(Array(9).fill(''))
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
    const [winner, setWinner] = useState<string | null>(null)
    const [gameHistory, setGameHistory] = useState<any[]>([])

    const handleCellClick = (index: number) => {
        if (gameState[index] || winner) return

        const newGameState = [...gameState]
        newGameState[index] = currentPlayer
        setGameState(newGameState)

        const win = checkWin(newGameState)
        if (win) {
            setWinner(currentPlayer)
            saveGameSession(currentPlayer, 'win')
        } else if (newGameState.every(cell => cell !== '')) {
            setWinner('draw')
            saveGameSession('draw', 'draw')
        } else {
            setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
        }
    }

    const checkWin = (board: string[]): boolean => {
        const lines = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ]
        return lines.some(([a,b,c]) => board[a] && board[a] === board[b] && board[a] === board[c])
    }

    const saveGameSession = async (result: string, status: string) => {
        const response = await fetch('/api/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ result, status, moves: gameState })
        })
        const data = await response.json()
        setGameHistory(prev => [...prev, data])
    }

    const resetGame = () => {
        setGameState(Array(9).fill(''))
        setCurrentPlayer('X')
        setWinner(null)
    }

    useEffect(() => {
        fetch('/api/game')
            .then(res => res.json())
            .then(data => setGameHistory(data))
    }, [])

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-4">Tic Tac Toe</h1>
            <TicTacToeBoard board={gameState} onCellClick={handleCellClick} />
            <div className="mt-4">
                <p>Current Player: {currentPlayer}</p>
                {winner && <p>Winner: {winner === 'draw' ? 'Draw!' : winner}</p>}
                <button onClick={resetGame} className="bg-red-500 text-white px-4 py-2 rounded">
                    Reset Game
                </button>
            </div>
            <GameHistory history={gameHistory} />
        </div>
    )
}

export default GamePage
