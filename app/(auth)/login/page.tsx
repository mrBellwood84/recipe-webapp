"use client";

import { Alert, Button, Container, Divider, Paper, Stack } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginForm } from "@/components/layout/auth/LoginForm";
import { GoogleLogin } from "@/components/layout/auth/GoogleLogin";
import { agentInternal } from "@/lib/agent/agentInternal";
import { LoginRequest } from "@/lib/models/auth/loginRequest";
import { User } from "@/lib/models/user/user";
import { HttpResponse } from "@/lib/models/httpResponse";
import { useSession } from "@/lib/session/SessionProvider";

const credentials: LoginRequest[] = [
  { email: "admin@recipeapp.com", password: "AdminSuperSecretPassword123!" },
  { email: "user1@example.com", password: "DevUser123!" },
  { email: "user2@example.com", password: "DevUser123!" },
];

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasExpired = searchParams.get("expired") === "true";

  const handleStaticLogin = async (user: LoginRequest) => {
    try {
      const res = await agentInternal.post("/api/auth/login", user);
      const data = (await res.json()) as HttpResponse<User | undefined>;

      if (data.statusCode === 200 && data.body) {
        session.setUser(data.body);
        session.setRole(data.body.role);
        router.push(data.body.role === "Admin" ? "/admin/dashboard" : "/dashboard");
      }
    } catch (err) {
      console.error("DEV Login feilet:", err);
    }
  };

  return (
    <Container size={420} my={40}>
      <Stack gap="md">
        {hasExpired && (
          <Alert color="orange" title="Økten har utløpt" variant="light" radius="md">
            Du må logge inn på nytt for å fortsette.
          </Alert>
        )}

        <LoginForm />

        <Divider label="eller" labelPosition="center" my="xs" />

        <GoogleLogin />

        {/* DEV :: Testverktøy (Kjører kun lokalt/i development) */}
        {process.env.NODE_ENV === "development" && (
          <Paper radius="md" p="md" withBorder bg="var(--mantine-color-gray-0)">
            <Divider label="DEV :: Testinnlogging" labelPosition="center" mb="sm" />
            <Stack gap="xs">
              <Button
                variant="light"
                color="gray"
                size="xs"
                onClick={() => handleStaticLogin(credentials[0])}
              >
                DEV :: Login Admin
              </Button>
              <Button
                variant="light"
                color="gray"
                size="xs"
                onClick={() => handleStaticLogin(credentials[1])}
              >
                DEV :: Login User 1
              </Button>
              <Button
                variant="light"
                color="gray"
                size="xs"
                onClick={() => handleStaticLogin(credentials[2])}
              >
                DEV :: Login User 2
              </Button>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Container>
  );
};

export default LoginPage;