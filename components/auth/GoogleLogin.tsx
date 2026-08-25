import {Button, Paper} from "@mantine/core";
import Image from "next/image";

export const GoogleLogin = () => {
  return (
    <Paper radius="md" p="md" withBorder>
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
        Logg inn med Google (Kommer snart)
      </Button>
    </Paper>
  );
};