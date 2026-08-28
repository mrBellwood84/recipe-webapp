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
    if (!session || !session.role) return;

    if (session.role === "Admin") {
      router.push("/admin/dashboard");
    } else if (session.role === "User") {
      router.push("/dashboard");
    }
  }, [session?.role, router]);

  const isRedirecting = Boolean(session?.role);

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