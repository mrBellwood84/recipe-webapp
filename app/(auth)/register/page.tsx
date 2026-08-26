"use client"

import {Container, Divider, Stack} from "@mantine/core";
import {RegisterForm} from "@/components/forms/auth/RegisterForm";
import {GoogleRegister} from "@/components/forms/auth/GoogleRegister";
import {useRouter} from "next/navigation";
import {useSession} from "@/lib/session/SessionProvider";
import {useEffect} from "react";

const RegisterPage = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    // Vent til sesjonsdataene er lastet inn
    if (!session || !session.role) return;

    if (session.role === "Admin") {
      router.push("/admin/dashboard");
    } else if (session.role === "User") {
      router.push("/dashboard");
    }
  }, [session?.role, router]);

  if (Boolean(session.role)) return <div>Loading</div>;
  return (
    <Container size={480} my={40}>
      <Stack gap="md">
        <RegisterForm/>

        <Divider label="eller" labelPosition="center" my="xs"/>

        <GoogleRegister/>
      </Stack>
    </Container>
  );
};

export default RegisterPage;