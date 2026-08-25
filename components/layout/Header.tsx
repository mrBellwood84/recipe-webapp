"use client";

import { useSession } from "@/lib/session/SessionProvider";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Button, Container, Group } from "@mantine/core";
import Link from "next/link";
import {ADMIN_LINKS, GUEST_LINKS, USER_LINKS} from "@/components/layout/header/navlinks";
import {Logo} from "@/components/layout/header/Logo";
import {NavLinksContainer} from "@/components/layout/header/NavLinkContainer";
import {UserMenu} from "@/components/layout/header/UserMenu";
import {MobileNavDrawer} from "@/components/layout/header/MobileNavDrawer";

export const Header = () => {
  const session = useSession();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const isGuest = !session.role;
  const logoHref =
    session.role === "Admin"
      ? "/admin/dashboard"
      : session.role === "User"
        ? "/dashboard"
        : "/";

  const currentLinks =
    session.role === "Admin"
      ? ADMIN_LINKS
      : session.role === "User"
        ? USER_LINKS
        : GUEST_LINKS;

  return (
    <>
      <Container size="lg" h="100%">
        <Group justify="space-between" align="center" h="100%">
          <Group gap="xs">
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
              size="sm"
            />
            <Group visibleFrom="sm">
              <Logo href={logoHref} />
            </Group>
          </Group>

          <Group hiddenFrom="sm">
            <Logo href={logoHref} />
          </Group>

          <NavLinksContainer links={currentLinks} />

          <Group gap="xs">
            {isGuest ? (
              <Group gap="xs">
                <Button
                  size="xs"
                  variant="subtle"
                  component={Link}
                  href="/login"
                  visibleFrom="xs"
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
            ) : (
              <UserMenu />
            )}
          </Group>
        </Group>
      </Container>

      <MobileNavDrawer
        opened={drawerOpened}
        onClose={closeDrawer}
        links={currentLinks}
        isGuest={isGuest}
      />
    </>
  );
};