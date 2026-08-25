"use client";

import { Anchor, Button, Drawer, Stack } from "@mantine/core";
import Link from "next/link";
import {NavItem} from "@/components/layout/header/navlinks";

interface MobileNavDrawerProps {
  opened: boolean;
  onClose: () => void;
  links: NavItem[];
  isGuest: boolean;
}

export const MobileNavDrawer = ({
                                  opened,
                                  onClose,
                                  links,
                                  isGuest,
                                }: MobileNavDrawerProps) => {
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      size="xs"
      padding="md"
      title="Meny"
      hiddenFrom="sm"
    >
      <Stack gap="md" mt="md">
        {links.map((link) => (
          <Anchor
            key={link.href}
            component={Link}
            href={link.href}
            size="md"
            fw={500}
            onClick={onClose}
          >
            {link.label}
          </Anchor>
        ))}

        {isGuest && (
          <Stack gap="xs" mt="lg">
            <Button
              variant="subtle"
              component={Link}
              href="/login"
              onClick={onClose}
              fullWidth
            >
              Logg inn
            </Button>
            <Button
              variant="filled"
              component={Link}
              href="/register"
              onClick={onClose}
              fullWidth
            >
              Opprett konto
            </Button>
          </Stack>
        )}
      </Stack>
    </Drawer>
  );
};