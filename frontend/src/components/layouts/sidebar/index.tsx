import { SidebarContent, SidebarHeader, SidebarProvider, Sidebar as SidebarUI } from "@/components/ui/sidebar"
import Title from "@/components/ui/title"
import { SITE_NAME } from "@/constants/site-info"
import { routes } from "@/routes"
import Link from "next/link"
import { PropsWithChildren } from "react"

export const Sidebar = ({ children }: PropsWithChildren) => {
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
  )
}
