"use client";

import { useState } from "react";
import {
  Title,
  Text,
  Paper,
  Stack,
  Group,
  TextInput,
  Table,
  Badge,
  ActionIcon,
  Menu,
  Button,
  Alert,
  SimpleGrid,
  Card,
  Avatar,
  Pagination,
} from "@mantine/core";
import {
  IconSearch,
  IconDotsVertical,
  IconLock,
  IconLockOpen,
  IconKey,
  IconTrash,
  IconUserPlus,
  IconInfoCircle,
  IconShield,
  IconUserCheck,
  IconUserOff,
} from "@tabler/icons-react";
import { AsyncMainContainer } from "@/components/containers/MainContainer";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Bruker";
  status: "Aktiv" | "Låst";
  createdAt: string;
  recipesCount: number;
}

const mockUsersData: MockUser[] = [
  {
    id: "usr-1",
    name: "Admin Hansen",
    email: "admin@kjoekkenhylla.no",
    role: "Admin",
    status: "Aktiv",
    createdAt: "01.01.2026",
    recipesCount: 42,
  },
  {
    id: "usr-2",
    name: "Kari Nordmann",
    email: "kari@example.com",
    role: "Bruker",
    status: "Aktiv",
    createdAt: "15.01.2026",
    recipesCount: 12,
  },
  {
    id: "usr-3",
    name: "Ola Nordmann",
    email: "ola@example.com",
    role: "Bruker",
    status: "Låst",
    createdAt: "02.02.2026",
    recipesCount: 3,
  },
  {
    id: "usr-4",
    name: "Per Olsen",
    email: "per.olsen@example.com",
    role: "Bruker",
    status: "Aktiv",
    createdAt: "20.02.2026",
    recipesCount: 8,
  },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const filteredUsers = mockUsersData.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AsyncMainContainer size="lg" py={30}>
      <Stack gap="lg">
        {/* Mockup Varsel-banner */}
        <Alert
          color="orange"
          title="🎨 Prototyping / Mockup-side"
          icon={<IconInfoCircle size={20} />}
          radius="md"
        >
          Dette er en visuell skisse for <b>Brukeradministrasjon</b>. Dataene og knappene er førebels mockups og er ikke koblet mot backend-API-et ennå.
        </Alert>

        {/* Overskrift og Handling */}
        <Group justify="space-between" align="flex-end">
          <div>
            <Title order={2}>👥 Brukeradministrasjon</Title>
            <Text c="dimmed" size="sm">
              Oversikt og styring av registrerte brukerkontoer
            </Text>
          </div>
          <Button leftSection={<IconUserPlus size={16} />} color="teal">
            Opprett ny bruker
          </Button>
        </Group>

        {/* Nøkkeltall */}
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          <Card withBorder padding="md" radius="md">
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Totalt Antall Brukere
                </Text>
                <Title order={3}>{mockUsersData.length}</Title>
              </div>
              <IconUserCheck size={32} color="var(--mantine-color-teal-6)" />
            </Group>
          </Card>

          <Card withBorder padding="md" radius="md">
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Aktive Kontoer
                </Text>
                <Title order={3}>
                  {mockUsersData.filter((u) => u.status === "Aktiv").length}
                </Title>
              </div>
              <IconUserCheck size={32} color="var(--mantine-color-green-6)" />
            </Group>
          </Card>

          <Card withBorder padding="md" radius="md">
            <Group justify="space-between">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Låste Kontoer
                </Text>
                <Title order={3}>
                  {mockUsersData.filter((u) => u.status === "Låst").length}
                </Title>
              </div>
              <IconUserOff size={32} color="var(--mantine-color-red-6)" />
            </Group>
          </Card>
        </SimpleGrid>

        {/* Hovedinnhold / Tabell */}
        <Paper p="md" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <TextInput
                placeholder="Søk på navn eller e-post..."
                leftSection={<IconSearch size={16} />}
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
                style={{ width: 320 }}
              />
              <Text size="xs" c="dimmed">
                Viser {filteredUsers.length} av {mockUsersData.length} brukere
              </Text>
            </Group>

            <Table highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Bruker</Table.Th>
                  <Table.Th>Rolle</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Opprettet</Table.Th>
                  <Table.Th>Oppskrifter</Table.Th>
                  <Table.Th style={{ width: 60 }}></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredUsers.map((user) => (
                  <Table.Tr key={user.id}>
                    <Table.Td>
                      <Group gap="sm">
                        <Avatar color={user.role === "Admin" ? "violet" : "blue"} radius="xl">
                          {user.name.substring(0, 2).toUpperCase()}
                        </Avatar>
                        <div>
                          <Text size="sm" fw={500}>
                            {user.name}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {user.email}
                          </Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={user.role === "Admin" ? "violet" : "gray"}
                        variant="light"
                        leftSection={user.role === "Admin" ? <IconShield size={12} /> : undefined}
                      >
                        {user.role}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Badge color={user.status === "Aktiv" ? "green" : "red"} variant="dot">
                        {user.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{user.createdAt}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{user.recipesCount} stk</Text>
                    </Table.Td>
                    <Table.Td>
                      <Menu position="bottom-end" shadow="md" width={200}>
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="gray">
                            <IconDotsVertical size={16} />
                          </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Label>Administrer</Menu.Label>
                          {user.status === "Aktiv" ? (
                            <Menu.Item leftSection={<IconLock size={14} />} color="orange">
                              Lås konto
                            </Menu.Item>
                          ) : (
                            <Menu.Item leftSection={<IconLockOpen size={14} />} color="green">
                              Lås opp konto
                            </Menu.Item>
                          )}
                          <Menu.Item leftSection={<IconKey size={14} />}>
                            Nullstill passord
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item leftSection={<IconTrash size={14} />} color="red">
                            Slett bruker
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>

            <Group justify="center" mt="md">
              <Pagination total={1} color="teal" size="sm" />
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </AsyncMainContainer>
  );
}