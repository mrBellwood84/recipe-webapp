import { Button } from "@mantine/core";
import Image from "next/image";
import {AuthCard} from "@/components/forms/common/AuthCard";

export const GoogleRegister = () => {
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
        disabled
      >
        Registrer med Google (Kommer snart)
      </Button>
    </AuthCard>
  );
};