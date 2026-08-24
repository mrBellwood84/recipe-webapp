"use client"

import {Alert, Button, Container, Group, Input, Paper, PasswordInput, Stack, TextInput, Title} from "@mantine/core";
import {useForm, isEmail, hasLength } from "@mantine/form";
import {LoginRequest} from "@/lib/models/auth/loginRequest";
import {agentInternal} from "@/lib/agent/agentInternal";
import {useState} from "react";
import {HttpResponse} from "@/lib/models/httpResponse";
import {LoginResponse} from "@/lib/models/auth/loginResponse";
import {useRouter} from "next/navigation";
import {useSession} from "@/lib/session/SessionProvider";
import {json} from "node:stream/consumers";

export const LoginForm = () => {

  const [requestActive, setRequestActive] = useState<boolean>(false);
  const [loginFailedMessage, setLoginFailedMessage] = useState<string | undefined>();

  const router = useRouter();
  const session = useSession();

  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Ikke gylding epost"),
      password: hasLength({min: 1}, "Passord mangler")
    }
  });

  const submitHandler = async (value: typeof form.values) => {
    setRequestActive(true);
    setLoginFailedMessage(undefined);

    try {
      const credentials: LoginRequest = value;

      const res = await agentInternal.post("/api/auth/login", credentials);

      const data = await res.json() as unknown as HttpResponse<LoginResponse>;

      if (res.status === 200 && data.body) {
        session.setUser(data.body);
        session.setRole(data.body.role);

        if (data.body.role === "Admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/dashboard");
        }
      } else {
        if (res.status === 400) {
          setLoginFailedMessage("Feil epost eller passord!");
        } else {
          setLoginFailedMessage("Pålogging ikke mulig grunnet feil på server. Prøv igjen senere...");
        }
      }

    } catch (err) {
      console.error(err);
      setLoginFailedMessage("Det oppstod en nettverksfeil. Vennligst prøv igjen.");
    } finally {
      setRequestActive(false);
    }
  };

  return (
    <Paper radius="md" p="xl" withBorder>
      <Title order={2} ta="center" mb="lg">
        Logg inn
      </Title>

      <form onSubmit={form.onSubmit(submitHandler)}>
        <Stack gap="md">
          <TextInput
            label="E-post"
            placeholder="din@epost.no"
            withAsterisk
            disabled={requestActive}
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <PasswordInput
            label="Passord"
            placeholder="Passord"
            withAsterisk
            disabled={requestActive}
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          {loginFailedMessage && (
            <Alert color="red" variant="light">
              {loginFailedMessage}
            </Alert>
          )}

          <Button type="submit" loading={requestActive} fullWidth mt="xs">
            Logg inn
          </Button>
        </Stack>
      </form>
    </Paper>
  );
}