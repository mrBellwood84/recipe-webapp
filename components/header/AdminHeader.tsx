"use client";

import { useSession } from "@/lib/session/SessionProvider";
import { agentInternal } from "@/lib/agent/agentInternal";
import { useRouter } from "next/navigation";
import { Anchor, Badge, Button, Container, Group } from "@mantine/core";
import Link from "next/link";
import {Logo} from "@/components/header/Logo";

export const AdminHeader = () => {
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
        {/* Logo og Admin-tag */}
        <Group gap="xs" align="center">
          <Logo href="/admin/dashboard" />
          <Badge color="red" variant="light" size="sm">
            Admin
          </Badge>
        </Group>

        {/* Navigasjonslenker for Admin */}
        <Group gap="lg" visibleFrom="sm">
          <Anchor component={Link} href="/admin/dashboard" size="sm" fw={500}>
            Dashboard
          </Anchor>
          {/* Her kan du enkelt fylle på flere admin-lenker f.eks. Brukere, Oppskrifter osv. */}
        </Group>

        {/* Handlinger */}
        <Group gap="xs">
          <Button size="xs" variant="outline" color="red" onClick={clickLogout}>
            Logg ut
          </Button>
        </Group>
      </Group>
    </Container>
  );
};