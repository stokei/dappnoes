import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { GameMapped } from '@/types/game';

import { Piece, PieceProps } from './piece';

export interface CurrentPlayerProps {
  playerDeck: GameMapped['playerDeck'];
  onDragStart: PieceProps['onDragStart'];
}

export const CurrentPlayer = ({
  playerDeck,
  onDragStart,
}: CurrentPlayerProps) => {
  return (
    <div  className="inset-x-2 p-4 fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <Card>
        <CardHeader>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {playerDeck.map((piece) => (
              <Piece
                key={piece.position}
                piece={piece}
                isDraggable={true}
                onDragStart={onDragStart}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
