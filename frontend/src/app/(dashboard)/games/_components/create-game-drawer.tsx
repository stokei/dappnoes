'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Stack } from '@/components/ui/stack';
import { useCreateGame } from '@/hooks/use-create-game';
import { useTranslations } from '@/hooks/use-translations';

const formSchema = z.object({
  name: z.string().min(1, { message: 'required' }),
  entryFee: z
    .string()
    .nonempty({ message: 'required' })
    .regex(/^\d*\.?\d*$/, { message: 'invalidNumber' })
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: 'greaterThanZero' }),
});

type FormValues = z.infer<typeof formSchema>;

export const CreateGameDrawer = () => {
  const translate = useTranslations();
  const { onCreateGame, isLoading } = useCreateGame();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      entryFee: 0
    }
  });

  const onSubmit = ({ name, entryFee }: FormValues) => {
    onCreateGame({
      name,
      entryFee,
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
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="entryFee"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translate.formatMessage({ id: 'entryFee' })} (ETH)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0.01"
                      disabled={isLoading}
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
                disabled={isLoading}
              >
                {translate.formatMessage({ id: 'cancel' })}
              </Button>
            </DrawerClose>
            <Button
              width="full"
              type="submit"
              form="create-game-form"
              loading={isLoading}
            >
              {translate.formatMessage({ id: 'create' })}
            </Button>
          </div>
        </DrawerFooter>
      </Form>
    </DrawerContent>
  );
};
