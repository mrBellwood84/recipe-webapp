"use client"

import { Group, Button, Container, Anchor, Title } from "@mantine/core";
import Link from "next/link";

export const NoUserHeader = () => {
  return (
    <Container size="lg" h="100%">
      <Group justify="space-between" align="center" h="100%">

        <Group gap="xs">
          <Button component={Link} href="/">LOGO</Button>
          <span>Oppskrifter</span>
        </Group>

        <Group gap="lg" visibleFrom="sm">
          <span>link</span>
          <span>link</span>
          <span>link</span>
        </Group>

        <Group gap="xs">
          <Button size="xs" component={Link} href="/register">Register</Button>
          <Button size="xs" component={Link} href="/login">Login</Button>
        </Group>

      </Group>
    </Container>
  );
};