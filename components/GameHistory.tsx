import React from 'react'

interface GameHistoryProps {
    history: any[]
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold">Game History</h2>
            <ul>
                {history.map((session, index) => (
                    <li key={index} className="border p-2 my-2">
                        Game {index + 1}: {session.result} - {new Date(session.createdAt).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GameHistory
