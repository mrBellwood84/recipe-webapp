"use client";

import { useSession } from "@/lib/session/SessionProvider";
import { agentInternal } from "@/lib/agent/agentInternal";
import { useRouter } from "next/navigation";
import { Anchor, Button, Container, Group, Text } from "@mantine/core";
import Link from "next/link";
import {Logo} from "@/components/layout/header/Logo";

export const UserHeader = () => {
  const session = useSession();
  const router = useRouter();

  const clickLogout = () => {
    agentInternal.get("/api/auth/logout").then((x) => {
      if (x.status === 200) {
        session.setUser(undefined);
        session.setRole(undefined);
        router.push("/");
      }
    });
  };

  return (
    <Container size="lg" h="100%">
      <Group justify="space-between" align="center" h="100%">
        {/* Logo som lenker til brukerens dashboard */}
        <Logo href="/dashboard" />

        {/* Hovedmenypunkter for brukeren */}
        <Group gap="lg" visibleFrom="sm">
          <Anchor component={Link} href="/dashboard" size="sm" fw={500}>
            Oversikt
          </Anchor>
          <Anchor component={Link} href="/user/recipes" size="sm" c="dimmed" fw={500}>
            Mine oppskrifter
          </Anchor>
          <Anchor component={Link} href="/user/mealplan" size="sm" c="dimmed" fw={500}>
            Måltidsplanlegger
          </Anchor>
          <Anchor component={Link} href="/user/shoppinglist" size="sm" c="dimmed" fw={500}>
            Handleliste
          </Anchor>
        </Group>

        {/* Brukerhilsen og Logout */}
        <Group gap="sm">
          {session.user?.firstName && (
            <Text size="sm" fw={500} visibleFrom="xs">
              Hei, {session.user.firstName}!
            </Text>
          )}
          <Button size="xs" variant="default" onClick={clickLogout}>
            Logg ut
          </Button>
        </Group>
      </Group>
    </Container>
  );
};