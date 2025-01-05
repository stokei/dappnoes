import { DragEventHandler } from 'react';

import { GameMapped } from '@/types/game';

import { Piece } from './piece';

export interface BoardProps {
  scale: number;
  boardDeck: GameMapped['boardDeck'];
  onDragOver: DragEventHandler<HTMLDivElement>
  onDrop: DragEventHandler<HTMLDivElement>
}

export const Board = ({
  scale,
  boardDeck,
  onDragOver,
  onDrop
}: BoardProps) => {
  return (
    <div
      className="w-full min-h-[400px] flex flex-1 overflow-auto bg-blue-700/50 rounded-lg p-8 justify-center items-center"
      style={{ transform: `scale(${scale})` }}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex flex-wrap gap-4 justify-center items-center min-h-full">
        {boardDeck.map((piece, index) => (
          <Piece
            key={piece.position}
            piece={piece}
            rotation={index % 2 ? 90 : 0}
          />
        ))}
      </div>
    </div>
  );
};
