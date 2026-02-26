import React from 'react'

interface TicTacToeBoardProps {
    board: string[]
    onCellClick: (index: number) => void
}

const TicTacToeBoard: React.FC<TicTacToeBoardProps> = ({ board, onCellClick }) => {
    return (
        <div className="grid grid-cols-3 gap-2 w-64 h-64 mx-auto">
            {board.map((cell, index) => (
                <button
                    key={index}
                    className="border border-gray-300 flex items-center justify-center text-3xl font-bold"
                    onClick={() => onCellClick(index)}
                >
                    {cell}
                </button>
            ))}
        </div>
    )
}

export default TicTacToeBoard
