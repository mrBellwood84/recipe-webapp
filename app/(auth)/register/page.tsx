import {Container, Divider, Stack} from "@mantine/core";
import {RegisterForm} from "@/components/auth/RegisterForm";
import {GoogleRegister} from "@/components/auth/GoogleRegister";

const RegisterPage = () => {
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