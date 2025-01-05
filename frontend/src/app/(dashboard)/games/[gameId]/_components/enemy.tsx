import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useTranslations } from '@/hooks/use-translations';

export interface EnemyProps {
  address: string;
  deckCount: number;
  winner?: boolean;
}

export const Enemy = ({
  address,
  deckCount = 0,
  winner
}: EnemyProps) => {
  const translate = useTranslations();
  return (
    <Card className="p-4">
      <Stack width="full" direction="column">
        <Text
          fontWeight="bold"
          truncate
        >
          {address}
        </Text>
        <Stack
          width="full"
          direction="row"
          justify="between"
          align="center"
        >
          <Text>
            {translate.formatMessage({ id: 'pieces' })}: {deckCount}
          </Text>
          {winner && (
            <Badge color="success">
              {translate.formatMessage({ id: 'winner' })}
            </Badge>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};
