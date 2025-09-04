import {
  // IconBarrierBlock,
  IconBrowserCheck,
  // IconBug,
  // IconChecklist,
  // IconError404,
  // IconHelp,
  IconLayoutDashboard,
  // IconLock,
  // IconLockAccess,
  // IconMessages,
  IconNotification,
  IconPackages,
  IconPalette,
  // IconServerOff,
  IconSettings,
  IconTool,
  IconUserCog,
  // IconUserOff,
  // IconUsers,
} from "@tabler/icons-react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";

import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Shadcn Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  // navGroups: [ ...original groups... ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: IconLayoutDashboard,
        },
        {
          title: "Khata",
          icon: IconPackages,
          items: [
            { title: "All Khata", url: "/khata", icon: IconPackages },
            { title: "Expenses", url: "/khata/expenses", icon: IconPackages },
          ],
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Business",
          url: "/business",
          icon: IconLayoutDashboard,
        },
        {
          title: "Categories",
          url: "/categories",
          icon: IconLayoutDashboard,
        },
        {
          title: "Vendors",
          url: "/vendors",
          icon: IconPackages,
        },
      ],
    },
    {
      title: "Other",
      items: [
        {
          title: "Settings",
          icon: IconSettings,
          items: [
            {
              title: "Profile",
              url: "/settings",
              icon: IconUserCog,
            },
            {
              title: "Account",
              url: "/settings/account",
              icon: IconTool,
            },
            {
              title: "Appearance",
              url: "/settings/appearance",
              icon: IconPalette,
            },
            {
              title: "Notifications",
              url: "/settings/notifications",
              icon: IconNotification,
            },
            {
              title: "Display",
              url: "/settings/display",
              icon: IconBrowserCheck,
            },
          ],
        },
        // {
        //   title: "Help Center",
        //   url: "/help-center",
        //   icon: IconHelp,
        // },
      ],
    },
    // ...other navGroups commented out...
  ],
};
