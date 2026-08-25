"use client";

import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconBook,
  IconCalendarEvent,
  IconDownload,
  IconLock,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl" py="md">
        {/* Hero Section */}
        <Stack align="center" my="lg" gap="md">
          <Badge
            variant="light"
            color="green"
            size="lg"
            leftSection={<IconSparkles size={14} />}
          >
            Din private digitale kokebok
          </Badge>

          <Title order={1} ta="center" fw={900} style={{ fontSize: "2.75rem" }}>
            Samle, planlegg og kos deg med maten –{" "}
            <Text component="span" c="green" inherit>
              helt uten støy
            </Text>
          </Title>

          <Text c="dimmed" size="lg" ta="center" >
            Kjøkkenhylla samler dine favorittoppskrifter på ett sted. Importer fra
            godkjente nettsteder, planlegg ukens måltider og generer ferdige
            handlelister – 100 % privat og reklamefritt.
          </Text>

          <Group justify="center" mt="md">
            <Button component={Link} href="/register" size="md" color="green">
              Kom i gang
            </Button>
            <Button component={Link} href="/login" size="md" variant="default">
              Logg inn
            </Button>
          </Group>
        </Stack>

        {/* Feature Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="xl">
          <Card radius="md" p="lg" withBorder>
            <ThemeIcon radius="md" size="xl" color="green" variant="light" mb="md">
              <IconBook size={24} />
            </ThemeIcon>

            <Text fw={600} size="lg" mb="xs">
              Privat oppskriftssamling
            </Text>

            <Text size="sm" c="dimmed">
              Dine oppskrifter tilhører deg. Ingen vurderinger, støy eller
              sosiale innslag fra andre brukere.
            </Text>
          </Card>

          <Card radius="md" p="lg" withBorder>
            <ThemeIcon radius="md" size="xl" color="blue" variant="light" mb="md">
              <IconDownload size={24} />
            </ThemeIcon>

            <Text fw={600} size="lg" mb="xs">
              Importer fra nett
            </Text>

            <Text size="sm" c="dimmed">
              Lim inn lenker fra godkjente matblogger. Vi skreller bort lange
              innledningstekster og reklame for deg.
            </Text>
          </Card>

          <Card radius="md" p="lg" withBorder>
            <ThemeIcon radius="md" size="xl" color="orange" variant="light" mb="md">
              <IconCalendarEvent size={24} />
            </ThemeIcon>

            <Text fw={600} size="lg" mb="xs">
              Ukesplan & Handleliste
            </Text>

            <Text size="sm" c="dimmed">
              Strukturering av ukens middager og automatisk sammenslåing av
              ingredienser til en ferdig handleliste.
            </Text>
          </Card>
        </SimpleGrid>

        {/* Info Banner */}
        <Card
          radius="md"
          p="xl"
          withBorder
          bg="var(--mantine-color-gray-0)"
          mt="lg"
        >
          <Group justify="space-between" align="center">
            <Stack gap={4}>
              <Group gap="xs">
                <IconLock size={18} />
                <Text fw={700} size="md">
                  100 % Privat & Eierskapsbasert
                </Text>
              </Group>
              <Text size="sm" c="dimmed">
                Bruk råvarene du har i kjøleskapet til å finne retter og redusere matsvinn.
              </Text>
            </Stack>

            <Button
              component={Link}
              href="/about"
              variant="subtle"
              color="gray"
              size="sm"
            >
              Les mer om prosjektet →
            </Button>
          </Group>
        </Card>
      </Stack>
    </Container>
  );
}