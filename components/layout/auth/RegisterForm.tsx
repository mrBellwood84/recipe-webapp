"use client"

import {
  Alert,
  Anchor,
  Button,
  Grid,
  GridCol,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import {useCallback, useState} from "react";
import {useRouter} from "next/navigation";
import {useSession} from "@/lib/session/SessionProvider";
import {hasLength, isEmail, useForm} from "@mantine/form";
import {values} from "eslint-config-next";
import {agentInternal} from "@/lib/agent/agentInternal";
import {HttpResponse} from "@/lib/models/httpResponse";
import {User} from "@/lib/models/user/user";

export const RegisterForm = () => {

  const [requestActive, setRequestActive] = useState<boolean>(false);
  const [registerFailedMessage, setRegisterFailedMessage] = useState<string | undefined>();

  const router = useRouter();
  const session = useSession();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate: {
      firstName: hasLength({min:1}, "Fornavn mangler"),
      lastName: hasLength({min:1}, "Etternavn mangler"),
      email: isEmail("Ikke gyldig epost"),
      password: (value) => {
        if (!value || value.length < 8) {
          return "Passordet må være minst 8 tegn";
        }
        if (!/[A-Z]/.test(value)) {
          return "Passordet må inneholde minst én stor bokstav";
        }
        if (!/[a-z]/.test(value)) {
          return "Passordet må inneholde minst én liten bokstav";
        }
        if (!/[0-9]/.test(value)) {
          return "Passordet må inneholde minst ett tall";
        }
        if (!/[^a-zA-Z0-9]/.test(value)) {
          return "Passordet må inneholde minst ett spesialtegn (!@#$%^&*)";
        }
        return null;
      },
    }
  });

  const submitHandler = async (values: typeof form.values) => {
    setRequestActive(true);
    setRegisterFailedMessage(undefined);

    try {
      const res = await agentInternal.post("/api/auth/register", values);
      const data = await res.json() as unknown as HttpResponse<User | undefined>;

      if (res.status === 200) {
        session.setUser(data.body)
        session.setRole(data.body!.role)
        router.push("/dashboard");
      } else {
        // Fanger opp 400 Bad Request (f.eks. "En bruker finnes allerede med denne eposten")
        console.error(data)
        setRegisterFailedMessage(data.message || "Kunne ikke registrere bruker.");
      }
    } catch {
      setRegisterFailedMessage("Det oppstod en nettverksfeil. Vennligst prøv igjen.");
    } finally {
      setRequestActive(false);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Title order={2} ta="center" mb="lg">
        Opprett ny bruker
      </Title>

      <form onSubmit={form.onSubmit(submitHandler)}>
        <Grid gap="md">
          <GridCol span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Fornavn"
              placeholder="Ola"
              withAsterisk
              disabled={requestActive}
              key={form.key("firstName")}
              {...form.getInputProps("firstName")}
            />
          </GridCol>

          <GridCol span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Etternavn"
              placeholder="Nordmann"
              withAsterisk
              disabled={requestActive}
              key={form.key("lastName")}
              {...form.getInputProps("lastName")}
            />
          </GridCol>

          <GridCol span={12}>
            <TextInput
              label="E-post"
              placeholder="din@epost.no"
              withAsterisk
              disabled={requestActive}
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </GridCol>

          <GridCol span={12}>
            <PasswordInput
              label="Passord"
              placeholder="Passord"
              withAsterisk
              disabled={requestActive}
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </GridCol>

          {registerFailedMessage && (
            <GridCol span={12}>
              <Alert color="red" variant="light">
                {registerFailedMessage}
              </Alert>
            </GridCol>
            )}

          <GridCol span={12} mt="xs">
            <Button type="submit" fullWidth>
              Registrer bruker
            </Button>
          </GridCol>
        </Grid>
      </form>

      <Text ta="center" size="sm" mt="md" c="dimmed">
        Har du allerede en konto?{" "}
        <Anchor component={Link} href="/login" size="sm" fw={500}>
          Logg inn
        </Anchor>
      </Text>
    </Paper>
  );
};