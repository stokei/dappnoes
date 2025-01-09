import { PropsWithChildren } from 'react';

import { PageLayout, PageLayoutContent } from '@/components/layouts';

export default function DashboardLayout({
  children,
}: PropsWithChildren) {
  return (
    <PageLayout>
      <PageLayoutContent>
        {children}
      </PageLayoutContent>
    </PageLayout>
  );
}
