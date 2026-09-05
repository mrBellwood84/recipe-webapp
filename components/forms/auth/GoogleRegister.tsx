"use client";

import { Button } from "@mantine/core";
import Image from "next/image";
import { AuthCard } from "@/components/forms/common/AuthCard";

export const GoogleRegister = () => {
  const handleGoogleRegister = () => {
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
        onClick={handleGoogleRegister}
      >
        Registrer deg med Google
      </Button>
    </AuthCard>
  );
};