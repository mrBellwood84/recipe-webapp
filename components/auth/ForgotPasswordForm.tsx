"use client";

import {Anchor, Button, Paper, Stack, Text, TextInput, Title,} from "@mantine/core";
import Link from "next/link";

export const ForgotPasswordForm = () => {
  return (
    <Paper radius="md" p="xl" withBorder>
      <Title order={2} ta="center" mb="xs">
        Glemt passord?
      </Title>

      <Text c="dimmed" size="sm" ta="center" mb="lg">
        Skriv inn e-postadressen din, så sender vi deg instruksjoner for å tilbakestille passordet.
      </Text>

      <form onSubmit={(e) => e.preventDefault()}>
        <Stack gap="md">
          <TextInput
            label="E-post"
            placeholder="din@epost.no"
            withAsterisk
          />

          <Button type="submit" disabled fullWidth mt="xs">
            Send tilbakestillingslenke (Kommer snart)
          </Button>
        </Stack>
      </form>

      <Text ta="center" size="sm" mt="md" c="dimmed">
        Husket du passordet allikevel?{" "}
        <Anchor component={Link} href="/login" size="sm" fw={500}>
          Logg inn
        </Anchor>
      </Text>
    </Paper>
  );
};