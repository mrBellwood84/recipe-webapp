"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, Button, Divider, Paper, Stack } from "@mantine/core";
import { LoginForm } from "@/components/forms/auth/LoginForm";
import { GoogleLogin } from "@/components/forms/auth/GoogleLogin";
import { agentInternal } from "@/lib/agent/agentInternal";
import { LoginRequest } from "@/lib/models/auth/loginRequest";
import { User } from "@/lib/models/user/user";
import { HttpResponse } from "@/lib/models/httpResponse";
import { useSession } from "@/lib/session/SessionProvider";
import { AsyncMainContainer } from "@/components/containers/MainContainer";

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

  useEffect(() => {
    if (!session || !session.role) return;

    if (session.role === "Admin") {
      router.push("/admin/dashboard");
    } else if (session.role === "User") {
      router.push("/dashboard");
    }
  }, [session?.role, router]);

  const isRedirecting = Boolean(session?.role);

  return (
    <AsyncMainContainer size={420} py={40} loading={isRedirecting}>
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
    </AsyncMainContainer>
  );
};

export default LoginPage;