"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Title,
  Text,
  Paper,
  Stack,
  Group,
  TextInput,
  Pagination,
  Select,
} from "@mantine/core";
import { IconSearch, IconFilter } from "@tabler/icons-react";
import { AsyncMainContainer } from "@/components/containers/MainContainer";
import { agentInternal } from "@/lib/agent/agentInternal";
import { AdminUserStatsCards } from "@/components/admin/users/AdminUserStatsCards";
import { AdminUserTable } from "@/components/admin/users/AdminUserTable";
import { AdminUserListItem } from "@/lib/models/admin/users/AdminUserListItem";

export default function AdminUsersPage() {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<AdminUserListItem[]>([]);

  // Filter- og pagineringstilstander (Kjøres lokalt i minnet)
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 15;

  // Henter HELE brukerlisten én gang fra det interne API-et (/api/admin/users)
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await agentInternal.get("/api/admin/users");
      if (res.ok) {
        const responseData = await res.json();
        // Håndterer både ren matrise og innkapslet objekt
        const items = Array.isArray(responseData.body)
          ? responseData.body
          : responseData.body?.items || [];
        setAllUsers(items);
      }
    } catch (err) {
      console.error("Feil ved henting av brukere:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // --- KLIENT-SIDE FILTRERING (0ms forsinkelse) ---
  const filteredUsers = useMemo(() => {
    return allUsers.filter((u) => {
      // 1. Statusfiltrering
      if (statusFilter === "locked" && !u.isLocked) return false;
      if (statusFilter === "unconfirmed" && u.isEmailConfirmed) return false;
      if (statusFilter === "inactive") {
        if (!u.lastLoginAt) return true;
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        if (new Date(u.lastLoginAt) >= sixMonthsAgo) return false;
      }

      // 2. Søk på navn eller e-post
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matchesEmail = u.email?.toLowerCase().includes(q);
        const matchesFullName = u.fullName?.toLowerCase().includes(q);
        const matchesFirstName = u.firstName?.toLowerCase().includes(q);
        const matchesLastName = u.lastName?.toLowerCase().includes(q);

        if (!matchesEmail && !matchesFullName && !matchesFirstName && !matchesLastName) {
          return false;
        }
      }

      return true;
    });
  }, [allUsers, search, statusFilter]);

  // --- KLIENT-SIDE PAGINERING ---
  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  // Nullstill til side 1 ved nytt søk eller filterendring
  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleFilterChange = (val: string | null) => {
    setStatusFilter(val || "all");
    setPage(1);
  };

  return (
    <AsyncMainContainer size="lg" py={30} loading={loading}>
      <Stack gap="lg">
        {/* Overskrift */}
        <div>
          <Title order={2}>👥 Brukeradministrasjon</Title>
          <Text c="dimmed" size="sm">
            Oversikt og styring av registrerte brukerkontoer i Kjøkkenhylla
          </Text>
        </div>

        {/* Nøkkeltall / Statistikkbrikker */}
        <AdminUserStatsCards
          totalItems={filteredUsers.length}
          activeFilter={statusFilter}
        />

        {/* Hovedvisning med Tabell & Søk/Filter */}
        <Paper p="md" radius="md" withBorder shadow="xs">
          <Stack gap="md">
            <Group justify="space-between" align="center" wrap="wrap">
              <Group gap="sm">
                <TextInput
                  placeholder="Søk på navn eller e-post..."
                  leftSection={<IconSearch size={16} />}
                  value={search}
                  onChange={(e) => handleSearchChange(e.currentTarget.value)}
                  style={{ width: 280 }}
                />

                <Select
                  value={statusFilter}
                  onChange={handleFilterChange}
                  leftSection={<IconFilter size={16} />}
                  data={[
                    { value: "all", label: "Alle brukere" },
                    { value: "locked", label: "Kun låste kontoer" },
                    { value: "unconfirmed", label: "Ubekreftet e-post" },
                    { value: "inactive", label: "Inaktive kontoer" },
                  ]}
                  style={{ width: 200 }}
                />
              </Group>

              <Text size="xs" c="dimmed">
                Viser {paginatedUsers.length} av {filteredUsers.length} brukere ({allUsers.length} totalt)
              </Text>
            </Group>

            {/* Tabellkomponent som mottar klient-paginerte rader */}
            <AdminUserTable
              users={paginatedUsers}
              onRefreshNeeded={fetchUsers}
            />

            {/* Paginering */}
            {totalPages > 1 && (
              <Group justify="center" mt="md">
                <Pagination
                  total={totalPages}
                  value={page}
                  onChange={setPage}
                  color="teal"
                  size="sm"
                />
              </Group>
            )}
          </Stack>
        </Paper>
      </Stack>
    </AsyncMainContainer>
  );
}