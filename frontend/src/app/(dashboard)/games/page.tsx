import { Container } from '@/components/ui/container';

import { GamesList } from './_components/games-list';

export default function Page() {
  return (
    <Container direction="column">
      <GamesList />
    </Container>
  );
}
