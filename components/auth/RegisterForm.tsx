"use client";

import { useState } from "react";
import { Anchor } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, isEmail, isNotEmpty } from "@mantine/form";
import { agentInternal } from "@/lib/agent/agentInternal";
import { useSession } from "@/lib/session/SessionProvider";
import { HttpResponse } from "@/lib/models/httpResponse";
import { User } from "@/lib/models/user/user";
import { AppFormProvider } from "@/components/forms/common/FormContext";
import { FormContainer } from "@/components/forms/common/FormContainer";
import { FormField } from "@/components/forms/common/FormField";
import { RegisterRequest } from "@/lib/models/auth/registerRequest";

// Utvider RegisterRequest for å håndtere bekreftelsesfeltet kun i klientgrensesnittet
interface RegisterFormValues extends RegisterRequest {
  confirmPassword: string;
}

export const RegisterForm = () => {
  const [requestActive, setRequestActive] = useState<boolean>(false);
  const [registerFailedMessage, setRegisterFailedMessage] = useState<string | undefined>();

  const router = useRouter();
  const session = useSession();

  const form = useForm<RegisterFormValues>({
    mode: "controlled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      firstName: isNotEmpty("Fornavn mangler"),
      lastName: isNotEmpty("Etternavn mangler"),
      email: isEmail("Ikke gyldig epost"),
      password: (value) => {
        if (!value || value.length < 8) return "Passordet må være minst 8 tegn";
        if (!/[A-Z]/.test(value)) return "Passordet må inneholde minst én stor bokstav";
        if (!/[a-z]/.test(value)) return "Passordet må inneholde minst én liten bokstav";
        if (!/[0-9]/.test(value)) return "Passordet må inneholde minst ett tall";
        if (!/[^a-zA-Z0-9]/.test(value)) return "Passordet må inneholde minst ett spesialtegn (!@#$%^&*)";
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? "Passordene må være identiske" : null,
    },
  });

  const submitHandler = async (values: typeof form.values) => {
    setRequestActive(true);
    setRegisterFailedMessage(undefined);

    // Fjerner confirmPassword slik at kun RegisterRequest sendes til API-et
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload } = values;

    try {
      const res = await agentInternal.post("/api/auth/register", payload);
      const data = (await res.json()) as HttpResponse<User | undefined>;

      if (res.status === 200) {
        session.setUser(data.body);
        session.setRole(data.body!.role);
        router.push("/dashboard");
      } else {
        setRegisterFailedMessage(data.message || "Kunne ikke registrere bruker.");
      }
    } catch {
      setRegisterFailedMessage("Det oppstod en nettverksfeil. Vennligst prøv igjen.");
    } finally {
      setRequestActive(false);
    }
  };

  return (
    <AppFormProvider form={form}>
      <FormContainer
        title="Opprett ny bruker"
        onSubmit={form.onSubmit(submitHandler)}
        submitText="Registrer bruker"
        loading={requestActive}
        errorMessage={registerFailedMessage}
        footer={
          <>
            Har du allerede en konto?{" "}
            <Anchor component={Link} href="/login" size="sm" fw={500}>
              Logg inn
            </Anchor>
          </>
        }
      >
        <FormField
          name="firstName"
          label="Fornavn"
          placeholder="Ola"
          span={{ base: 12, sm: 6 }}
          required
          disabled={requestActive}
        />

        <FormField
          name="lastName"
          label="Etternavn"
          placeholder="Nordmann"
          span={{ base: 12, sm: 6 }}
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
          name="password"
          type="password"
          label="Passord"
          placeholder="Passord"
          required
          disabled={requestActive}
        />

        <FormField
          name="confirmPassword"
          type="password"
          label="Gjenta passord"
          placeholder="Gjenta passord"
          required
          disabled={requestActive}
        />
      </FormContainer>
    </AppFormProvider>
  );
};