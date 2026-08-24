"use client"

import {Alert, Box, Button, Container, Divider, Paper, Stack} from "@mantine/core";
import {agentInternal} from "@/lib/agent/agentInternal";
import {LoginRequest} from "@/lib/models/auth/loginRequest";
import {User} from "@/lib/models/user/user";
import {HttpResponse} from "@/lib/models/httpResponse";
import {useSession} from "@/lib/session/SessionProvider";
import {useRouter, useSearchParams} from "next/navigation";
import {LoginForm} from "@/components/layout/auth/LoginForm";

const credentials: LoginRequest[] = [
  { email: "admin@recipeapp.com", password: "AdminSuperSecretPassword123!" },
  { email: "user1@example.com", password: "DevUser123!" },
  { email: "user2@example.com", password: "DevUser123!" },
]

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasExpired = searchParams.get("expired") === "true";

  const onStaticLoginClick = (user: LoginRequest) => {
    agentInternal.post("/api/auth/login", user)
      .then(x => x.json() as unknown as HttpResponse<User | undefined>)
      .then(data => {
        switch (data.statusCode){
          case 200:
            session.setUser(data.body);
            session.setRole(data.body?.role)
            if (data.body?.role === "Admin") router.push("/admin/dashboard");
            else router.push("/dashboard");
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <Container size={420} my={40}>
      <Stack gap="md">
        {hasExpired && (
          <Alert color="orange" title="Økten har utløpt" variant="light" radius="md">
            Du må logge inn på nytt for å fortsette.
          </Alert>
        )}

        <LoginForm />

        {/* DEV :: Testverktøy */}
        <Paper radius="md" p="md" withBorder bg="var(--mantine-color-gray-0)">
          <Divider label="DEV :: Testinnlogging" labelPosition="center" mb="sm" />
          <Stack gap="xs">
            <Button variant="light" color="gray" size="xs" onClick={() => onStaticLoginClick(credentials[0])}>
              DEV :: Login Admin
            </Button>
            <Button variant="light" color="gray" size="xs" onClick={() => onStaticLoginClick(credentials[1])}>
              DEV :: Login User 1
            </Button>
            <Button variant="light" color="gray" size="xs" onClick={() => onStaticLoginClick(credentials[2])}>
              DEV :: Login User 2
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}

export default LoginPage