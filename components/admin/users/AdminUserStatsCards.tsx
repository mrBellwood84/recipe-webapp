"use client";

import { SimpleGrid, Card, Group, Text, Title } from "@mantine/core";
import {
  IconUserCheck,
  IconUserOff,
  IconUsers,
  IconMailQuestion,
} from "@tabler/icons-react";

interface Props {
  totalItems: number;
  activeFilter?: string;
}

export function AdminUserStatsCards({ totalItems, activeFilter }: Props) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
      <Card withBorder padding="md" radius="md">
        <Group justify="space-between">
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Totalt Treff
            </Text>
            <Title order={3}>{totalItems}</Title>
          </div>
          <IconUsers size={32} color="var(--mantine-color-blue-6)" />
        </Group>
      </Card>

      <Card withBorder padding="md" radius="md">
        <Group justify="space-between">
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Aktivt Filter
            </Text>
            <Title order={4} c="teal.7">
              {!activeFilter || activeFilter === "all"
                ? "Alle brukere"
                : activeFilter === "locked"
                  ? "Kun låste"
                  : activeFilter === "unconfirmed"
                    ? "Ubekreftet e-post"
                    : "Inaktive"}
            </Title>
          </div>
          {activeFilter === "locked" ? (
            <IconUserOff size={32} color="var(--mantine-color-red-6)" />
          ) : activeFilter === "unconfirmed" ? (
            <IconMailQuestion size={32} color="var(--mantine-color-orange-6)" />
          ) : (
            <IconUserCheck size={32} color="var(--mantine-color-teal-6)" />
          )}
        </Group>
      </Card>

      <Card withBorder padding="md" radius="md">
        <Group justify="space-between">
          <div>
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              Status
            </Text>
            <Text size="xs" c="dimmed">
              Synkronisert mot Auth API
            </Text>
          </div>
          <IconUserCheck size={32} color="var(--mantine-color-green-6)" />
        </Group>
      </Card>
    </SimpleGrid>
  );
}