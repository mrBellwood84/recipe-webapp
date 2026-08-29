"use client";

import { useState, useEffect } from "react";
import {
  Title,
  Text,
  Paper,
  Stack,
  Group,
  TextInput,
  PasswordInput,
  Button,
  Alert,
  Avatar,
  Badge,
  Divider,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconUser,
  IconLock,
  IconTrash,
  IconAlertTriangle,
  IconCheck,
  IconShieldLock,
  IconCode,
} from "@tabler/icons-react";
import { AsyncMainContainer } from "@/components/containers/MainContainer";
import { useSession } from "@/lib/session/SessionProvider";

export default function UserProfilePage() {
  const { user, setUser } = useSession();

  // Profilredigering state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Endre passord state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Slette konto modal state
  const [deleteModalOpened, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAdmin = user?.role === "Admin";

  // Synkroniser skjema med bruker fra SessionProvider
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setAvatarUrl(user.avatarUrl || "");
    }
  }, [user]);

  // Handtering av profiloppdatering via internt API
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAdmin) return;

    setIsUpdatingProfile(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, avatarUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Kunne ikke oppdatere profilen.");
      }

      // Oppdaterer sesjonstilstanden i klienten
      setUser(data);

      notifications.show({
        title: "Profil oppdatert",
        message: "Profilinformasjonen din ble lagret.",
        color: "green",
        icon: <IconCheck size={16} />,
      });
    } catch (err: unknown) {
      notifications.show({
        title: "Feil ved oppdatering",
        message: err instanceof Error ? err.message : "Kunne ikke oppdatere profilen.",
        color: "red",
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  // Handtering av passordendring via internt API
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;

    setIsChangingPassword(true);
    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Kunne ikke endre passord.");
      }

      notifications.show({
        title: "Passord endret",
        message: data.message || "Passordet ditt ble oppdatert.",
        color: "green",
        icon: <IconCheck size={16} />,
      });

      setCurrentPassword("");
      setNewPassword("");
    } catch (err: unknown) {
      notifications.show({
        title: "Feil ved endring av passord",
        message: err instanceof Error ? err.message : "Endring av passord mislyktes.",
        color: "red",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Handtering av kontosletting via internt API
  const handleDeleteProfile = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/profile", {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Kunne ikke slette kontoen.");
      }

      setUser(undefined);
      window.location.href = "/login";
    } catch (err: unknown) {
      notifications.show({
        title: "Feil ved sletting",
        message: err instanceof Error ? err.message : "Kunne ikke slette kontoen.",
        color: "red",
      });
    } finally {
      setIsDeleting(false);
      closeDeleteModal();
    }
  };

  return (
    <AsyncMainContainer size="md" py={30}>
      <Stack gap="lg">
        {/* Sidetittel & Mock Badge Header */}
        <Group justify="space-between" align="center">
          <Title order={2}>Min Profil</Title>
          <Badge
            color="orange"
            variant="light"
            size="lg"
            leftSection={<IconCode size={14} />}
          >
            Mock Data
          </Badge>
        </Group>

        {/* Brukerkort / Header */}
        <Paper p="lg" radius="md" withBorder>
          <Group justify="space-between" align="center">
            <Group gap="md">
              <Avatar src={user?.avatarUrl} size="xl" radius="xl" color="blue">
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </Avatar>
              <div>
                <Group gap="xs">
                  <Title order={3}>
                    {user?.firstName} {user?.lastName}
                  </Title>
                  <Badge color={isAdmin ? "red" : "blue"} variant="light">
                    {user?.role || "User"}
                  </Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  {user?.email}
                </Text>
                {user?.createdAt && (
                  <Text size="xs" c="dimmed" mt={4}>
                    Opprettet: {new Date(user.createdAt).toLocaleDateString("no-NO")}
                  </Text>
                )}
              </div>
            </Group>
          </Group>
        </Paper>

        {/* Advarsel dersom bruker er Admin */}
        {isAdmin && (
          <Alert color="orange" title="Låst for redigering" icon={<IconShieldLock size={20} />}>
            Profilredigering er låst for administratorer. Kontakt systemansvarlig dersom personalia må endres.
          </Alert>
        )}

        {/* Skjema 1: Personalia */}
        <Paper p="lg" radius="md" withBorder>
          <form onSubmit={handleUpdateProfile}>
            <Stack gap="md">
              <Group gap="xs">
                <IconUser size={20} color="var(--mantine-color-blue-6)" />
                <Text fw={600} size="md">
                  Personalia & Avatar
                </Text>
              </Group>

              <Divider />

              <Group grow wrap="nowrap">
                <TextInput
                  label="Fornavn"
                  placeholder="Ditt fornavn"
                  value={firstName}
                  onChange={(e) => setFirstName(e.currentTarget.value)}
                  disabled={isAdmin}
                  required
                />
                <TextInput
                  label="Etternavn"
                  placeholder="Ditt etternavn"
                  value={lastName}
                  onChange={(e) => setLastName(e.currentTarget.value)}
                  disabled={isAdmin}
                  required
                />
              </Group>

              <TextInput
                label="E-postadresse"
                value={user?.email || ""}
                disabled
                description="E-postadressen er unikk og kan ikke endres."
              />

              <TextInput
                label="Avatar URL"
                placeholder="https://eksempel.no/bilde.jpg"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.currentTarget.value)}
                disabled={isAdmin}
                description="Lenke til bilde for profilikonet ditt."
              />

              {!isAdmin && (
                <Group justify="flex-end" mt="xs">
                  <Button type="submit" color="blue" loading={isUpdatingProfile}>
                    Lagre Profilendringer
                  </Button>
                </Group>
              )}
            </Stack>
          </form>
        </Paper>

        {/* Skjema 2: Endre Passord */}
        <Paper p="lg" radius="md" withBorder>
          <form onSubmit={handleChangePassword}>
            <Stack gap="md">
              <Group gap="xs">
                <IconLock size={20} color="var(--mantine-color-violet-6)" />
                <Text fw={600} size="md">
                  Sikkerhet & Passord
                </Text>
              </Group>

              <Divider />

              <PasswordInput
                label="Nåværende passord"
                placeholder="Skriv inn ditt nåværende passord"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.currentTarget.value)}
                required
              />

              <PasswordInput
                label="Nytt passord"
                placeholder="Skriv inn nytt passord"
                value={newPassword}
                onChange={(e) => setNewPassword(e.currentTarget.value)}
                required
              />

              <Group justify="flex-end" mt="xs">
                <Button type="submit" color="violet" loading={isChangingPassword}>
                  Oppdater Passord
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>

        {/* Faresone: Sletting */}
        <Paper p="lg" radius="md" withBorder style={{ borderColor: "var(--mantine-color-red-3)" }}>
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <div>
                <Group gap="xs">
                  <IconAlertTriangle size={20} color="var(--mantine-color-red-6)" />
                  <Text fw={600} size="md" c="red">
                    Faresone
                  </Text>
                </Group>

                <Text size="xs" c="dimmed" mt={4}>
                  Sletting av kontoen din vil fjerne all data permanent.
                </Text>
              </div>

              <Button color="red" variant="light" leftSection={<IconTrash size={16} />} onClick={openDeleteModal}>
                Slett Konto
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>

      {/* Bekreftelsesmodal for sletting */}
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="⚠️ Bekreft sletting av konto"
        centered
        radius="md"
      >
        <Stack gap="md">
          <Text size="sm">
            Er du sikker på at du vil slette brukerkontoen din? Handlingen kan <b>ikke angres</b>.
          </Text>

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={closeDeleteModal} disabled={isDeleting}>
              Avbryt
            </Button>
            <Button color="red" onClick={handleDeleteProfile} loading={isDeleting}>
              Slett Konto
            </Button>
          </Group>
        </Stack>
      </Modal>
    </AsyncMainContainer>
  );
}