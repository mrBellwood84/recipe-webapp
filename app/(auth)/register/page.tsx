"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Divider, Stack } from "@mantine/core";
import { RegisterForm } from "@/components/forms/auth/RegisterForm";
import { GoogleRegister } from "@/components/forms/auth/GoogleRegister";
import { useSession } from "@/lib/session/SessionProvider";
import { AsyncMainContainer } from "@/components/containers/MainContainer";

const RegisterPage = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    // Sjekk om brukeren er logget inn
    if (!session || !session.user) return;

    // Hvis velkomsten ikke er fullført, send til /welcome
    if (!session.user.welcomeCompleted) {
      router.push("/user/welcome");
      return;
    }

    // Ellers rute basert på rolle slik som før
    const role = session.role?.toLowerCase();
    if (role === "admin") {
      router.push("/admin/dashboard");
    } else if (role === "user") {
      router.push("/dashboard");
    }
  }, [session?.user, session?.role, router]);

  const isRedirecting = Boolean(session?.user);

  return (
    <AsyncMainContainer size={480} py={40} loading={isRedirecting}>
      <Stack gap="md">
        <RegisterForm />

        <Divider label="eller" labelPosition="center" my="xs" />

        <GoogleRegister />
      </Stack>
    </AsyncMainContainer>
  );
};

export default RegisterPage;