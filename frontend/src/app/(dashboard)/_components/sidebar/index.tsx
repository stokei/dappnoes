"use client";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Text from "@/components/ui/text";
import { useTranslations } from "@/hooks/use-translations";
import { routes } from "@/routes";
import { Home as HomeIcon } from 'lucide-react';
import Link from 'next/link';

export const Sidebar = () => {
  const translate = useTranslations();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href={routes.dashboard.home}>
            <HomeIcon />
            <Text>{translate.formatMessage({ id: 'home' })}</Text>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
