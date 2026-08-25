"use client";

import {Anchor, Badge, Box, Container, Divider, Group, SimpleGrid, Stack, Text, Title,} from "@mantine/core";
import Link from "next/link";
import {useSession} from "@/lib/session/SessionProvider";

export const Footer = () => {
  const session = useSession();
  const userActive = Boolean(session.user);

  return (
    <Box bg="var(--mantine-color-body)" mt={80} component="footer">
      <Divider/>
      <Container size="lg" py="xl">
        <SimpleGrid cols={{base: 1, sm: 2, md: 4}} spacing="xl" mb="xl">
          {/* Kolonne 1: Brand & Visjon */}
          <Stack gap="xs">
            <Group gap="xs">
              <Title order={3} c="brand">
                Kjøkkenhylla
              </Title>
              <Badge variant="dot" color="blue" size="sm">
                Smidig matmestring
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              Samle dine egne oppskrifter eller skrap dem fra nettet. Tilpass ingredienser,
              få full oversikt over næringsinnhold og allergener, og planlegg måltider –
              alt på din personlige profil.
            </Text>
          </Stack>

          {/* Kolonne 2: Medlemsfunksjoner (Låst for gjester) */}
          <Stack gap="xs">
            <Group gap={6}>
              <Text fw={600} size="sm">
                Min profil
              </Text>
              <Badge size="xs" color="gray" variant="outline">
                Krever konto
              </Badge>
            </Group>
            <Anchor component={Link} href="/user/recipes" size="sm" c="dimmed">
              Mine oppskrifter
            </Anchor>
            <Anchor component={Link} href="/user/scraper" size="sm" c="dimmed">
              Skrap ny oppskrift
            </Anchor>
            <Anchor component={Link} href="/user/mealplan" size="sm" c="dimmed">
              Måltidsplanlegger
            </Anchor>
            <Anchor component={Link} href="/user/shoppinglist" size="sm" c="dimmed">
              Handleliste
            </Anchor>
          </Stack>

          {/* Kolonne 3: Om & Kontakt */}
          <Stack gap="xs">
            <Text fw={600} size="sm">
              Om oss
            </Text>
            <Anchor component={Link} href="/about" size="sm" c="dimmed">
              Om Kjøkkenhylla
            </Anchor>
            <Anchor component={Link} href="/contact" size="sm" c="dimmed">
              Kontakt oss
            </Anchor>
            <Anchor component={Link} href="/faq" size="sm" c="dimmed">
              Hjelp & FAQ
            </Anchor>
            <Anchor component={Link} href="/status" size="sm" c="dimmed">
              Systemstatus
            </Anchor>
          </Stack>

          {/* Kolonne 4: Juridisk & Personvern */}
          <Stack gap="xs">
            <Text fw={600} size="sm">
              Juridisk
            </Text>
            <Anchor component={Link} href="/privacy" size="sm" c="dimmed">
              Personvernerklæring
            </Anchor>
            <Anchor component={Link} href="/terms" size="sm" c="dimmed">
              Brukervilkår
            </Anchor>
            <Anchor component={Link} href="/cookies" size="sm" c="dimmed">
              Informasjonskapsler
            </Anchor>
            <Anchor component={Link} href="/accessibility" size="sm" c="dimmed">
              Tilgjengelighet
            </Anchor>
          </Stack>
        </SimpleGrid>

        <Divider my="sm"/>

        <Group justify="space-between" align="center" pt="xs">
          <Text size="xs" c="dimmed">
            © {new Date().getFullYear()} Kjøkkenhylla. Alle rettigheter reservert.
          </Text>
          {!userActive &&
          <Text size="xs" c="dimmed">
            Gjester må logge inn for å benytte applikasjonens funksjoner.
          </Text>
          }
        </Group>
      </Container>
    </Box>
  );
};