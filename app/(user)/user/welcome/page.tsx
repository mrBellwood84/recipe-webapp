"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Title,
  Text,
  Paper,
  Stack,
  Group,
  Button,
  Alert,
  ThemeIcon,
  List,
  Divider,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconMailCheck,
  IconAlertTriangle,
  IconArrowRight,
  IconSend,
  IconCheck,
  IconClock,
  IconLock,
} from "@tabler/icons-react";
import { AsyncMainContainer } from "@/components/containers/MainContainer";
import { useSession } from "@/lib/session/SessionProvider";
import { agentInternal } from "@/lib/agent/agentInternal";

export default function WelcomePage() {
  const router = useRouter();
  const { user, setUser } = useSession();
  const [loading, setLoading] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);

  // Tilgangskontroll: Sjekk om bruker har lov til å være her
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    // Hvis brukeren allerede har fullført velkomstsiden/førstegangsinnlogging, send til dashboard
    if (user.welcomeCompleted || user.isEmailConfirmed) {
      router.replace("/dashboard");
    }
  }, [user, router]);

  // Håndter videregang til dashboard (merker velkomst som fullført)
  const handleProceedToDashboard = async () => {
    setLoading(true);

    try {
      // Merk velkomst som sett i backend/session
      const res = await agentInternal.post("/api/auth/complete-welcome", {});
      if (res.ok && user) {
        setUser({ ...user, welcomeCompleted: true });
      }
    } catch (err) {
      console.error("Kunne ikke merke velkomst som fullført:", err);
    } finally {
      router.push("/dashboard");
    }
  };

  // Send e-postbekreftelse på nytt
  const handleResendConfirmation = async () => {
    setResendingEmail(true);

    try {
      const res = await agentInternal.post("/api/auth/resend-confirmation", {
        email: user?.email,
      });

      if (res.ok) {
        notifications.show({
          title: "Bekreftelseslenke sendt!",
          message: "Sjekk innboksen din (og ev. søppelpost) for en ny bekreftelseslenke.",
          color: "teal",
          icon: <IconCheck size={16} />,
        });
      } else {
        notifications.show({
          title: "Feil ved utsending",
          message: "Kunne ikke sende bekreftelses-epost. Prøv igjen om litt.",
          color: "red",
        });
      }
    } catch {
      notifications.show({
        title: "Nettverksfeil",
        message: "Kunne ikke koble til serveren.",
        color: "red",
      });
    } finally {
      setResendingEmail(false);
    }
  };

  if (!user) return null;

  return (
    <AsyncMainContainer size="md" py={40}>
      <Stack gap="xl">
        {/* HERO / OVERSKRIFT */}
        <Paper p="xl" radius="md" withBorder bg="teal.0" style={{ borderColor: "var(--mantine-color-teal-3)" }}>
          <Group justify="space-between" align="center" wrap="wrap">
            <Stack gap="xs" style={{ flex: 1 }}>
              <Title order={1} size="h2" c="teal.9">
                Velkommen til Kjøkkenhylla, {user.firstName}! 🍳
              </Title>
              <Text size="sm" c="teal.9">
                Kontoen din er opprettet. For å holde plattformen trygg og fri for inaktive/fiktive brukere, må du bekrefte e-postadressen din.
              </Text>
            </Stack>

            <ThemeIcon color="teal" size={60} radius="xl">
              <IconMailCheck size={36} />
            </ThemeIcon>
          </Group>
        </Paper>

        {/* E-POSTBEKREFTELSE INFORMASJONSKORT */}
        <Paper p="lg" radius="md" withBorder shadow="xs">
          <Stack gap="md">
            <Group gap="xs">
              <IconClock size={22} color="var(--mantine-color-orange-6)" />
              <Title order={3} size="h4">
                Viktig om bekreftelse av konto (`{user.email}`)
              </Title>
            </Group>

            <Divider />

            <Alert color="orange" icon={<IconAlertTriangle size={20} />} radius="md">
              Vi har nylig sendt en aktiveringslenke til <b>{user.email}</b>. Klikk på lenken i e-posten for å bekrefte kontoen din.
            </Alert>

            <Text size="sm" fw={600} mt="xs">
              Tidsfrister for ubekreftede kontoer:
            </Text>

            <List spacing="sm" size="sm" center icon={
              <ThemeIcon color="orange" size={20} radius="xl" variant="light">
                <IconClock size={12} />
              </ThemeIcon>
            }>
              <List.Item>
                <b>Påminnelse (1 uke):</b> Du mottar en e-postpåminnelse om du ikke har bekreftet kontoen din innen 7 dager.
              </List.Item>
              <List.Item>
                <b>Konto låses (2 uker):</b> Kontoer som ikke er bekreftet innen 14 dager blir automatisk sperret for innlogging.
              </List.Item>
              <List.Item>
                <b>Sletting (1 måned):</b> Sperrede kontoer som ikke bekreftes slettes permanent fra databasen etter 30 dager.
              </List.Item>
            </List>

            <Divider mt="sm" />

            <Group justify="space-between" align="center" wrap="wrap" gap="md">
              <div>
                <Text size="xs" c="dimmed">
                  Finner du ikke e-posten? Sjekk søppelpost-mappen din.
                </Text>
              </div>

              <Group gap="xs">
                <Button
                  variant="outline"
                  color="gray"
                  leftSection={<IconSend size={16} />}
                  onClick={handleResendConfirmation}
                  loading={resendingEmail}
                >
                  Send ny e-post
                </Button>

                <Button
                  color="teal"
                  rightSection={<IconArrowRight size={16} />}
                  onClick={handleProceedToDashboard}
                  loading={loading}
                >
                  Gå til min oversikt
                </Button>
              </Group>
            </Group>
          </Stack>
        </Paper>

        {/* INAKTIVITETSPOLICY APPLIKASJONSKORT */}
        <Paper p="lg" radius="md" withBorder bg="gray.0">
          <Stack gap="xs">
            <Group gap="xs">
              <IconLock size={18} color="var(--mantine-color-gray-7)" />
              <Text size="sm" fw={700}>
                Generell kontohåndtering og inaktivitet
              </Text>
            </Group>
            <Text size="xs" c="dimmed">
              Dersom kontoen din er inaktiv i 6 måneder vil du få et e-postvarsel. Logger du ikke på innen 1 år, vil kontoen låses og deretter slettes for å beskytte personvernet og hindre lagring av ubrukte data.
            </Text>
          </Stack>
        </Paper>
      </Stack>
    </AsyncMainContainer>
  );
}