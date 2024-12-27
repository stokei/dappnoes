'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Stack } from '@/components/ui/stack';
import { useTranslations } from '@/hooks/use-translations';
import { useUser } from '@/hooks/use-user';

import { useCreateGame } from '../_hooks/use-create-game';

const formSchema = z.object({
  name: z.string().min(1, { message: 'requirede' }),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateGameDrawer = () => {
  const translate = useTranslations();
  const { onCreateGame } = useCreateGame();
  const { accountAddress } = useUser();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  });

  const onSubmit = ({ name }: FormValues) => {
    onCreateGame({
      name,
      owner: accountAddress || '',
      entryFee: 1.1589632,
      maxPlayers: 2
    });
  };

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>
          {translate.formatMessage({ id: 'createGame' })}
        </DrawerTitle>
      </DrawerHeader>
      <Form {...form}>
        <form
          id="create-game-form"
          className="px-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Stack>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate.formatMessage({ id: 'name' })}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={translate.formatMessage({ id: 'name' })}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Stack>
        </form>
        <DrawerFooter>
          <div className="flex flex-row gap-4">
            <DrawerClose asChild>
              <Button
                width="full"
                variant="outline"
              >
                {translate.formatMessage({ id: 'cancel' })}
              </Button>
            </DrawerClose>
            <Button
              width="full"
              type="submit"
              form="create-game-form"
            >
              {translate.formatMessage({ id: 'create' })}
            </Button>
          </div>
        </DrawerFooter>
      </Form>
    </DrawerContent>
  );
};
