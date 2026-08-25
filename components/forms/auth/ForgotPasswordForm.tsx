"use client";

import { Anchor } from "@mantine/core";
import Link from "next/link";
import { useForm, isEmail } from "@mantine/form";
import { CreateFormContainer } from "@/components/forms/common/CreateFormContainer";
import { FormField } from "@/components/forms/common/FormField";
import { AppFormProvider } from "@/components/forms/common/FormContext";

interface ForgotPasswordFormValues {
  email: string;
}

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordFormValues>({
    mode: "controlled",
    initialValues: {
      email: "",
    },
    validate: {
      email: isEmail("Ikke gyldig epost"),
    },
  });

  const submitHandler = async (values: ForgotPasswordFormValues) => {
    // Logikk implementeres når tilbakestilling av passord er klargjort på backend
  };

  return (
    <AppFormProvider form={form}>
      <CreateFormContainer
        title="Glemt passord?"
        description="Skriv inn e-postadressen din, så sender vi deg instruksjoner for å tilbakestille passordet."
        onSubmit={form.onSubmit(submitHandler)}
        submitText="Send tilbakestillingslenke (Kommer snart)"
        disabled
        footer={
          <>
            Husket du passordet allikevel?{" "}
            <Anchor component={Link} href="/login" size="sm" fw={500}>
              Logg inn
            </Anchor>
          </>
        }
      >
        <FormField
          name="email"
          label="E-post"
          placeholder="din@epost.no"
          required
        />
      </CreateFormContainer>
    </AppFormProvider>
  );
};