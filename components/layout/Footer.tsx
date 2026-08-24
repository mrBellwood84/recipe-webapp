"use client";

import {
  Anchor,
  Badge,
  Box,
  Container,
  Divider,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";

export const Footer = () => {
  return (
    <Box bg="var(--mantine-color-body)" mt={80} component="footer">
      <Divider />
      <Container size="lg" py="xl">
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" mb="xl">
          {/* Kolonne 1: Om appen */}
          <Stack gap="xs" style={{ gridColumn: "span 2" }}>
            <Group gap="xs">
              <Title order={3} c="brand">
                Kjøkkenhylla
              </Title>
              <Badge variant="dot" color="blue" size="sm">
                Smidig matmestring
              </Badge>
            </Group>
            <Text size="sm" c="dimmed" style={{ maxWidth: 440 }}>
              Samle dine egne oppskrifter eller skrap dem direkte fra favorittsidene dine på nettet.
              Tilpass ingredienser, få full oversikt over næringsinnhold og allergener, og planlegg
              ukehandling og måltider – alt samlet på din personlige profil.
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

          {/* Kolonne 3: Tilgang & Konto */}
          <Stack gap="xs">
            <Text fw={600} size="sm">
              Kom i gang
            </Text>
            <Anchor component={Link} href="/login" size="sm" c="dimmed">
              Logg inn
            </Anchor>
            <Anchor component={Link} href="/register" size="sm" c="dimmed">
              Opprett ny konto
            </Anchor>
            <Anchor component={Link} href="/recover" size="sm" c="dimmed">
              Glemt passord
            </Anchor>
          </Stack>
        </SimpleGrid>

        <Divider my="sm" />

        <Group justify="space-between" align="center" pt="xs">
          <Text size="xs" c="dimmed">
            © {new Date().getFullYear()} Kjøkkenhylla. Alle rettigheter reservert.
          </Text>
          <Text size="xs" c="dimmed">
            Gjester må logge inn for å benytte applikasjonens funksjoner.
          </Text>
        </Group>
      </Container>
    </Box>
  );
};