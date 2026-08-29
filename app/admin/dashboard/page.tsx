"use client";

import { useEffect, useState } from "react";
import {
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Checkbox,
  Badge,
  Tabs,
  Card,
  Progress,
  Anchor,
  Alert,
} from "@mantine/core";
import { AsyncMainContainer } from "@/components/containers/MainContainer";

interface TodoItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
}

interface CategoryTodos {
  category: string;
  badgeColor: string;
  items: TodoItem[];
}

const initialRoadmap: CategoryTodos[] = [
  {
    category: "Brukeradministrasjon",
    badgeColor: "blue",
    items: [
      {
        id: "usr_list",
        label: "Brukeroversikt",
        description: "Tabell over alle registrerte brukere med søk og filtrering.",
        completed: false,
      },
      {
        id: "usr_lock",
        label: "Låse / Låse opp kontoer",
        description: "Mulighet til å deaktivere brukere ved behov.",
        completed: false,
      },
      {
        id: "usr_reset_del",
        label: "Passord-nullstilling & Sletting",
        description: "Administrativ tilbakestilling av passord og sletting av kontoer.",
        completed: false,
      },
    ],
  },
  {
    category: "Innhold & Whitelist",
    badgeColor: "green",
    items: [
      {
        id: "rec_whitelist",
        label: "Godkjente Nettsider (Domene-Whitelist)",
        description: "Administrere liste over domener Core API tillater skraping fra (f.eks. matprat.no).",
        completed: false,
      },
      {
        id: "rec_categories",
        label: "Kategori- & Råvareregister",
        description: "Administrere og justere globale kategorier, ingredienser og måleenheter.",
        completed: false,
      },
    ],
  },
  {
    category: "System & Helse",
    badgeColor: "violet",
    items: [
      {
        id: "sys_health",
        label: "Live Systemstatus",
        description: "Egnet side/visning for mikrotjenestenes /health-status.",
        completed: false,
      },
      {
        id: "sys_seq",
        label: "Seq Log Shortcut",
        description: "Direktelenke til Seq logg-dashboard (Port 5341).",
        completed: false,
      },
      {
        id: "sys_rabbitmq",
        label: "RabbitMQ Dashboard Shortcut",
        description: "Direktelenke til RabbitMQ for overvåking av meldingskøer (Port 15672).",
        completed: false,
      },
    ],
  },
  {
    category: "Scraper (Utforskes)",
    badgeColor: "orange",
    items: [
      {
        id: "sc_error_logs",
        label: "Scraper Feillogger",
        description: "Oversikt over feilede skrapeforsøk (f.eks. endret HTML-struktur på eksterne sider).",
        completed: false,
      },
    ],
  },
];

const AdminDashboardPage = () => {
  const [roadmap, setRoadmap] = useState<CategoryTodos[]>(initialRoadmap);

  useEffect(() => {
    const saved = localStorage.getItem("kjoekkenhylla_admin_roadmap");
    if (saved) {
      try {
        setRoadmap(JSON.parse(saved));
      } catch (e) {
        console.error("Kunne ikke laste roadmap fra localStorage", e);
      }
    }
  }, []);

  const toggleItem = (categoryId: string, itemId: string) => {
    const updated = roadmap.map((cat) => {
      if (cat.category !== categoryId) return cat;
      return {
        ...cat,
        items: cat.items.map((item) =>
          item.id === itemId ? { ...item, completed: !item.completed } : item
        ),
      };
    });

    setRoadmap(updated);
    localStorage.setItem("kjoekkenhylla_admin_roadmap", JSON.stringify(updated));
  };

  const totalItems = roadmap.reduce((acc, cat) => acc + cat.items.length, 0);
  const completedItems = roadmap.reduce(
    (acc, cat) => acc + cat.items.filter((i) => i.completed).length,
    0
  );
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  return (
    <AsyncMainContainer size="lg" py={30}>
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="flex-end">
          <div>
            <Title order={2}>👑 Admin Dashboard</Title>
            <Text c="dimmed" size="sm">
              Kjøkkenhylla Administrasjon & Huskeliste
            </Text>
          </div>
          <Badge size="lg" variant="filled" color="teal">
            Kjøkkenhylla Admin
          </Badge>
        </Group>

        {/* Fremgang */}
        <Paper p="md" radius="md" withBorder>
          <Stack gap="xs">
            <Group justify="space-between">
              <Text fw={500}>Systemutvikling Fremdrift</Text>
              <Text size="sm" c="dimmed">
                {completedItems} av {totalItems} funksjoner fullført ({progressPercentage}%)
              </Text>
            </Group>
            <Progress value={progressPercentage} color="teal" size="xl" radius="xl" animated />
          </Stack>
        </Paper>

        {/* Infrastruktur Snarveier */}
        <Alert color="blue" title="🔗 Infrastruktur & Verktøy" radius="md">
          <Group gap="md" mt="xs">
            <Anchor href="http://localhost:5341" target="_blank" size="sm" fw={500}>
              🔍 Åpne Seq Log Dashboard (5341)
            </Anchor>
            <Anchor href="http://localhost:15672" target="_blank" size="sm" fw={500}>
              🐰 Åpne RabbitMQ Manager (15672)
            </Anchor>
          </Group>
        </Alert>

        {/* Tabs for Kategorier */}
        <Tabs defaultValue="Brukeradministrasjon">
          <Tabs.List mb="md">
            {roadmap.map((cat) => (
              <Tabs.Tab key={cat.category} value={cat.category}>
                {cat.category}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {roadmap.map((cat) => (
            <Tabs.Panel key={cat.category} value={cat.category}>
              <Stack gap="md">
                {cat.items.map((item) => (
                  <Card key={item.id} withBorder radius="md" padding="sm">
                    <Group align="flex-start" justify="space-between">
                      <Checkbox
                        checked={item.completed}
                        onChange={() => toggleItem(cat.category, item.id)}
                        label={
                          <Text
                            fw={500}
                            style={{
                              textDecoration: item.completed ? "line-through" : "none",
                              color: item.completed ? "var(--mantine-color-dimmed)" : "inherit",
                            }}
                          >
                            {item.label}
                          </Text>
                        }
                        description={item.description}
                        size="md"
                        color={cat.badgeColor}
                      />
                      <Badge color={item.completed ? "gray" : cat.badgeColor} variant="light">
                        {item.completed ? "Fullført" : "Planlagt"}
                      </Badge>
                    </Group>
                  </Card>
                ))}
              </Stack>
            </Tabs.Panel>
          ))}
        </Tabs>
      </Stack>
    </AsyncMainContainer>
  );
};

export default AdminDashboardPage;