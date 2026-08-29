"use client";

import { Title, Text, Paper, Stack, Badge, Alert, List, ThemeIcon } from "@mantine/core";
import { IconFileText, IconCheck, IconAlertTriangle } from "@tabler/icons-react";

export default function TermsPage() {
  return (
    <Paper p="xl" radius="md" withBorder shadow="xs">
      <Stack gap="lg">
        <div>
          <Badge color="gray" variant="light" mb="xs">
            Sist oppdatert: 25. august 2026
          </Badge>
          <Title order={2} size="h2">
            Brukervilkår for Kjøkkenhylla
          </Title>
          <Text size="sm" c="dimmed" mt={4}>
            Velkommen til Kjøkkenhylla. Ved å opprette en konto eller bruke våre tjenester aksepterer du følgende brukervilkår.
          </Text>
        </div>

        <Stack gap="md">
          {/* Seksjon 1 */}
          <div>
            <Title order={3} size="h4" mb={6}>
              1. Aksept av vilkår og aldersgrense
            </Title>
            <List spacing="xs" size="sm" center icon={<ThemeIcon color="teal" size={18} radius="xl"><IconCheck size={12} /></ThemeIcon>}>
              <List.Item><b>Aksept:</b> Ved å ta i bruk Kjøkkenhylla inngår du en bindende avtale om å følge disse brukervilkårene.</List.Item>
              <List.Item><b>Aldersgrense:</b> Du må være minst 13 år gammel (eller ha foreldrenes/foresattes samtykke) for å opprette en konto.</List.Item>
            </List>
          </div>

          {/* Seksjon 2 */}
          <div>
            <Title order={3} size="h4" mb={6}>
              2. Tjenestebeskrivelse og tilgang
            </Title>
            <Text size="sm" lh={1.6}>
              Kjøkkenhylla er et personlig digitalt verktøy for organisering av oppskrifter, måltidsplanlegging, næringsberegning og generering av handlelister. Tjenesten leveres "som den er" (As is) uten garantier for uavbrutt drift. Kjernefunksjonalitet er reservert for innloggede brukere med en aktiv konto.
            </Text>
          </div>

          {/* Seksjon 3 */}
          <div>
            <Title order={3} size="h4" mb={6}>
              3. Oppskriftsskraping og opphavsrett
            </Title>
            <Text size="sm" lh={1.6} mb="xs">
              Oppskriftsskraperen i Kjøkkenhylla er utformet som et personlig arkiv- og organiseringsverktøy for privat bruk.
            </Text>
            <List spacing="xs" size="sm">
              <List.Item><b>Brukerens ansvar:</b> Når du importerer eller henter innhold fra eksterne nettsider, er du selv ansvarlig for at bruken skjer i samsvar med de aktuelle nettsidenes egne vilkår og opphavsrett.</List.Item>
              <List.Item><b>Ingen videreformidling:</b> Opphavsrettslig beskyttet materiale som skrapes til ditt private arkiv skal ikke videreformidles, redistribueres eller publiseres offentlig uten tillatelse.</List.Item>
            </List>
          </div>

          {/* Seksjon 4 */}
          <Alert color="orange" title="4. Ansvarsfraskrivelse for helse, allergener og næringsinnhold" icon={<IconAlertTriangle size={20} />}>
            <Stack gap={6}>
              <Text size="xs">
                • <b>Veiledende data:</b> Beregninger av næringsinnhold, anbefalt dagsinntak og allergenmerking i Kjøkkenhylla er <b>kun veiledende</b>.
              </Text>
              <Text size="xs">
                • <b>Ikke medisinsk rådgivning:</b> Innholdet i applikasjonen erstatter ikke profesjonell medisinsk rådgivning eller ernæringsfysiologisk veiledning.
              </Text>
              <Text size="xs">
                • <b>Allergier:</b> Ved alvorlige allergier, cøliaki eller spesifikke medisinske behov må du alltid sjekke produsentens originalemballasje og rådføre deg med helsepersonell. Kjøkkenhylla fraskriver seg ethvert ansvar for allergiske reaksjoner.
              </Text>
            </Stack>
          </Alert>

          {/* Seksjon 5, 6, 7 */}
          <div>
            <Title order={3} size="h4" mb={6}>
              5. Eksterne lenker & Endringer
            </Title>
            <Text size="sm" lh={1.6}>
              Kjøkkenhylla kan inneholde lenker til eksterne oppskriftssider. Vi har ingen kontroll over og tar intet ansvar for innholdet eller praksisen til eksterne nettsteder. Vi kan fra tid til annen oppdatere disse brukervilkårene. Ved å fortsette å bruke Kjøkkenhylla godtar du de oppdaterte vilkårene.
            </Text>
          </div>
        </Stack>
      </Stack>
    </Paper>
  );
}