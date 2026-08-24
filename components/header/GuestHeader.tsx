"use client";

import { Anchor, Button, Container, Group } from "@mantine/core";
import Link from "next/link";
import {Logo} from "@/components/header/Logo";

export const GuestHeader = () => {
  return (
    <Container size="lg" h="100%">
      <Group justify="space-between" align="center" h="100%">
        {/* Delt Logo-komponent */}
        <Logo />

        {/* Info-lenker for uinnloggede */}
        <Group gap="xl" visibleFrom="sm">
          <Anchor component={Link} href="/#funksjoner" size="sm" c="dimmed" fw={500}>
            Hva får du?
          </Anchor>
          <Anchor component={Link} href="/#om" size="sm" c="dimmed" fw={500}>
            Om appen
          </Anchor>
        </Group>

        {/* Auth-knapper */}
        <Group gap="xs">
          <Button
            size="xs"
            variant="subtle"
            component={Link}
            href="/login"
          >
            Logg inn
          </Button>
          <Button
            size="xs"
            variant="filled"
            component={Link}
            href="/register"
          >
            Opprett konto
          </Button>
        </Group>
      </Group>
    </Container>
  );
};