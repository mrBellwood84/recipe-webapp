"use client";

import { useState } from "react";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { AppFormProvider } from "@/components/forms/common/FormContext";
import { CreateFormContainer } from "@/components/forms/common/CreateFormContainer";
import { FormField } from "@/components/forms/common/FormField";

export interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

export const ContactForm = () => {
  const [requestActive, setRequestActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const form = useForm<ContactRequest>({
    mode: "controlled",
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: {
      name: isNotEmpty("Vennligst oppgi navnet ditt"),
      email: isEmail("Ikke gyldig e-postadresse"),
      message: isNotEmpty("Vennligst skriv inn en melding"),
    },
  });

  const submitHandler = async (values: ContactRequest) => {
    // Implementeres når backend-tjenesten for melding utsendelse er på plass
  };

  return (
    <AppFormProvider form={form}>
      <CreateFormContainer
        title="Kontakt oss"
        description="Har du spørsmål, tilbakemeldinger eller forslag? Send oss en melding!"
        onSubmit={form.onSubmit(submitHandler)}
        submitText="Send melding (Kommer snart)"
        loading={requestActive}
        disabled
        errorMessage={errorMessage}
      >
        <FormField
          name="name"
          label="Navn"
          placeholder="Ditt navn"
          required
          disabled={requestActive}
        />

        <FormField
          name="email"
          label="E-post"
          placeholder="din@epost.no"
          required
          disabled={requestActive}
        />

        <FormField
          name="message"
          label="Melding"
          placeholder="Hva har du på hjertet?"
          type="textarea"
          required
          disabled={requestActive}
        />
      </CreateFormContainer>
    </AppFormProvider>
  );
};