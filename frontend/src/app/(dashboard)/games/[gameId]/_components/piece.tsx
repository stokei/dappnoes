import { DragEvent } from 'react';

import { GamePiece } from '@/types/game';

export interface PieceProps {
  piece: GamePiece;
  rotation?: number;
  isDraggable?: boolean;
  onDragStart?: (e: DragEvent<HTMLDivElement>, piece: GamePiece) => void
}

export const Piece = ({
  rotation = 0,
  isDraggable = false,
  piece,
  onDragStart,
}: PieceProps) => {
  return (
    <div
      className="inline-flex flex-col bg-white border-2 border-gray-300 rounded w-12 h-24 m-1 cursor-pointer transform transition-transform hover:scale-105"
      style={{ transform: `rotate(${rotation}deg)` }}
      draggable={isDraggable}
      onDragStart={(e) => onDragStart && onDragStart(e, piece)}
    >
      <div className="flex-1 border-b border-gray-300 flex items-center justify-center text-xl font-bold">
        {piece?.left}
      </div>
      <div className="flex-1 flex items-center justify-center text-xl font-bold">
        {piece?.right}
      </div>
    </div>
  );
};
