import {
  IconBook,
  IconCalendarEvent,
  IconInfoCircle,
  IconLayoutDashboard,
  IconProps,
  IconShieldCheck,
  IconShoppingCart,
  IconSparkles,
} from "@tabler/icons-react";
import React from "react";

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<IconProps>;
}

export const GUEST_LINKS: NavItem[] = [
  { label: "Hva får du?", href: "/features", icon: IconSparkles },
  { label: "Om appen", href: "/about", icon: IconInfoCircle },
];

export const USER_LINKS: NavItem[] = [
  { label: "Oversikt", href: "/dashboard", icon: IconLayoutDashboard },
  { label: "Oppskrifter", href: "/user/recipes", icon: IconBook },
  { label: "Måltidsplanlegger", href: "/user/mealplan", icon: IconCalendarEvent },
  { label: "Handleliste", href: "/user/shoppinglist", icon: IconShoppingCart },
];

export const ADMIN_LINKS: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: IconShieldCheck },
];