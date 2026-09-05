"use client";

import { Button } from "@mantine/core";
import Image from "next/image";
import { AuthCard } from "@/components/forms/common/AuthCard";

export const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = "/api/auth/google";
  };

  return (
    <AuthCard>
      <Button
        variant="default"
        fullWidth
        leftSection={
          <Image
            src="/icons/google.svg"
            alt="Google"
            width={18}
            height={18}
          />
        }
        onClick={handleGoogleLogin}
      >
        Logg på med Google
      </Button>
    </AuthCard>
  );
};