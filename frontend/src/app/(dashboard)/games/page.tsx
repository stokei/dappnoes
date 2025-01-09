import { PrivateRoute } from '@/components/private-route';
import { Container } from '@/components/ui/container';

import { GamesList } from './_components/games-list';

export default function Page() {
  return (
    <PrivateRoute>
      <Container direction="column">
        <GamesList />
      </Container>
    </PrivateRoute>
  );
}
