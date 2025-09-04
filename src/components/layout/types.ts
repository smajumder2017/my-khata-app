import { LinkProps } from "next/link";

export interface NavUser {
  name: string;
  email: string;
  avatar: string;
}

export interface NavBusiness {
  name: string;
  plan: string;
}

interface BaseNavItem {
  title: string;
  badge?: string;
  icon?: React.ElementType;
}

type NavLink = BaseNavItem & {
  url: LinkProps["href"];
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps["href"] })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface SidebarData {
  user: NavUser;
  businesses: NavBusiness[];
  navGroups: NavGroup[];
}

export type { SidebarData, NavGroup, NavItem, NavCollapsible, NavLink };
