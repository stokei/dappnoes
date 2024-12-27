import Link from 'next/link';
import { PropsWithChildren } from 'react';

import { Sidebar as SidebarUI,SidebarContent, SidebarHeader, SidebarProvider } from '@/components/ui/sidebar';
import { Title } from '@/components/ui/title';
import { SITE_NAME } from '@/constants/site-info';
import { routes } from '@/routes';

export const PageLayoutSidebar = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <SidebarProvider defaultOpen>
        <SidebarUI>
          <SidebarHeader>
            <Link href={routes.home} className="flex gap-1">
              <Title>
                {SITE_NAME}
              </Title>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            {children}
          </SidebarContent>
        </SidebarUI>
      </SidebarProvider>
    </div>
  );
};
