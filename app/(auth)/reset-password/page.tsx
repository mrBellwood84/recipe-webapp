"use client";

import { useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { ResetPasswordForm } from "@/components/forms/auth/ResetPasswordForm";
import { useSession } from "@/lib/session/SessionProvider";
import { AsyncMainContainer } from "@/components/containers/MainContainer";

const ResetPasswordContent = () => {
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
      <ResetPasswordForm />
    </AsyncMainContainer>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;