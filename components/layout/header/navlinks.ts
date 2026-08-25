export interface NavItem {
  label: string;
  href: string;
}

export const GUEST_LINKS: NavItem[] = [
  { label: "Hva får du?", href: "/features" },
  { label: "Om appen", href: "/about" },
];

export const USER_LINKS: NavItem[] = [
  { label: "Oversikt", href: "/dashboard" },
  { label: "Mine oppskrifter", href: "/user/recipes" },
  { label: "Måltidsplanlegger", href: "/user/mealplan" },
  { label: "Handleliste", href: "/user/shoppinglist" },
];

export const ADMIN_LINKS: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard" },
];