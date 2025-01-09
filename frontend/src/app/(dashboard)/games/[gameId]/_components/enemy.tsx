import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Stack } from '@/components/ui/stack';
import { Text } from '@/components/ui/text';
import { useTranslations } from '@/hooks/use-translations';
import { useUser } from '@/hooks/use-user';

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
  const { accountAddress } = useUser();
  const translate = useTranslations();
  const isMe = accountAddress === address;

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
          <Stack
            width="fit"
            direction="row"
            align="center"
          >
            <Text>
              {translate.formatMessage({ id: 'pieces' })}: {deckCount}
            </Text>
            {isMe && (
              <Badge color="info">
                {translate.formatMessage({ id: 'you' })}
              </Badge>
            )}
          </Stack>
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
