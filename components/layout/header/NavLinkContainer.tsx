"use client";

import { Anchor, Group } from "@mantine/core";
import Link from "next/link";
import {NavItem} from "@/components/layout/header/navlinks";

interface NavLinksContainerProps {
  links: NavItem[];
}

export const NavLinksContainer = ({ links }: NavLinksContainerProps) => {
  return (
    <Group gap="lg" visibleFrom="sm">
      {links.map((link) => (
        <Anchor
          key={link.href}
          component={Link}
          href={link.href}
          size="sm"
          fw={500}
          c="dimmed"
          style={{ transition: "color 0.15s ease" }}
        >
          {link.label}
        </Anchor>
      ))}
    </Group>
  );
};