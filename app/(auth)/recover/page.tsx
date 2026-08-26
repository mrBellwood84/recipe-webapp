"use client"

import {Container} from "@mantine/core";
import {ForgotPasswordForm} from "@/components/forms/auth/ForgotPasswordForm";
import {useRouter} from "next/navigation";
import {useSession} from "@/lib/session/SessionProvider";
import {useEffect} from "react";

const ForgotPasswordPage = () => {

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
  }, [session, session?.role, router]);

  if (Boolean(session.role)) return <div>Loading</div>;
  return (
    <Container size={420} my={40}>
      <ForgotPasswordForm/>
    </Container>
  );
};

export default ForgotPasswordPage;