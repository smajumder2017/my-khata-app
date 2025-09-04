"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavGroup } from "@/components/layout/nav-group";
import { NavUser } from "@/components/layout/nav-user";
import { TeamSwitcher } from "@/components/layout/team-switcher";
import { getSidebarData } from "./data/sidebar-data";
import { useSession } from "next-auth/react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const sidebarData = getSidebarData({ email: session?.user.email || "", name: "", avatar: "" }, session?.user.businesses.map((business) => ({ name: '', plan: '', })) ?? [])
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        {session?.user.businesses.length ? <TeamSwitcher businesses={sidebarData.businesses} /> : null}
        
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session?.user?.name || "Guest",
            email: session?.user?.email || "",
            avatar: session?.user?.image || "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
