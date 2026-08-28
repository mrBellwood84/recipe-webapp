"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ForgotPasswordForm } from "@/components/forms/auth/ForgotPasswordForm";
import { useSession } from "@/lib/session/SessionProvider";
import { AsyncMainContainer } from "@/components/containers/MainContainer";

const ForgotPasswordPage = () => {
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
    <AsyncMainContainer size={420} py={40} loading={isRedirecting}>
      <ForgotPasswordForm />
    </AsyncMainContainer>
  );
};

export default ForgotPasswordPage;