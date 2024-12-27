import { PropsWithChildren } from 'react';

import { PageLayout, PageLayoutContent } from '@/components/layouts';
import { PrivateRoute } from '@/components/private-route';

export default function DashboardLayout({
  children,
}: PropsWithChildren) {
  return (
    <PrivateRoute>
      <PageLayout>
        <PageLayoutContent>
          {children}
        </PageLayoutContent>
      </PageLayout>
    </PrivateRoute>
  );
}
