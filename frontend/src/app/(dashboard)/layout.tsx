import { PropsWithChildren } from 'react';

import { PageLayout } from '@/components/layouts';
import { PrivateRoute } from '@/components/private-route';

import { Sidebar } from './_components/sidebar';

export default function DashboardLayout({
  children,
}: PropsWithChildren) {
  return (
    <PrivateRoute>
      <PageLayout.Root>
        <PageLayout.Sidebar>
          <Sidebar />
        </PageLayout.Sidebar>
        <PageLayout.Content>
          {children}
        </PageLayout.Content>
      </PageLayout.Root>
    </PrivateRoute>
  );
}
