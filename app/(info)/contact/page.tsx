"use client";

import { Container, Stack } from "@mantine/core";
import { ContactForm } from "@/components/forms/ContactForm";

const ContactPage = () => {
  return (
    <Container size={520} my={40}>
      <Stack gap="md">
        <ContactForm />
      </Stack>
    </Container>
  );
};

export default ContactPage;