"use client";

import React, {SyntheticEvent} from "react";
import { Alert, Button, Grid, Paper, Text, Title } from "@mantine/core";

export interface FormContainerProps {
  /** Hovedtittel for skjemaet (f.eks. "Logg inn" eller "Opprett ny bruker"). */
  title: string;

  /** Valgfri undertekst eller forklaring plassert rett under tittelen. */
  description?: string;

  /**
   * Handlingsfunksjon som kjøres når skjemaet sendes inn.
   * Kobles som regel til `form.onSubmit(submitHandler)` fra Mantine Form.
   */
  onSubmit?: (e: SyntheticEvent<HTMLFormElement>) => void;

  /** Tekst på hovedknappen for innsending. Dersom utelatt, vises ingen knapp. */
  submitText?: string;

  /** Setter innsendingsknappen i opptatt-tilstand (viser spinnende lasteindikator). */
  loading?: boolean;

  /** Deaktiverer innsendingsknappen. */
  disabled?: boolean;

  /** Feilmeldingstekst. Hvis angitt, vises en rød Mantine Alert øverst i skjemaet. */
  errorMessage?: string;

  /**
   * Valgfritt element plassert under skjemaet (f.eks. navigeringslenker som "Glemt passord?" eller "Registrer her").
   */
  footer?: React.ReactNode;

  /** Innholdet i skjemaet, vanligvis bestående av `<FormField>`-komponenter. */
  children: React.ReactNode;
}


/**
 * Felles layout-wrapper for applikasjonens skjemaer.
 *
 * Sørger for konsistent visning av:
 * - Kort-innramming (`Paper` med kantomriss og polstring)
 * - Sentrert tittel og beskrivelse
 * - Responsivt Mantine Grid for skjemaelementer
 * - Feilmeldinger i rød Alert-boks
 * - Primær submit-knapp med lasteindikator
 * - Sentrert bunntekst/lenkeseksjon
 *
 * @example
 * ```tsx
 * <FormContainer * description="Fyll inn e-post og passord" errorMessage="{error}" footer="{<Anchor" href="/register" loading="{isLoading}" onSubmit="{form.onSubmit(handleSubmit)}" submitText="Logg inn" title="Logg inn">Har du ikke konto?</Anchor>}
 * >
 *   <FormField label="E-post" name="email" required/>
 *   <FormField label="Passord" name="password" required type="password"/>
 * </FormContainer>
 * ```
 */
export const FormContainer = ({
                                title,
                                description,
                                onSubmit,
                                submitText,
                                loading = false,
                                disabled = false,
                                errorMessage,
                                footer,
                                children,
                              }: FormContainerProps) => {
  return (
    <Paper radius="md" p="xl" withBorder>
      <Title order={2} ta="center" mb={description ? "xs" : "lg"}>
        {title}
      </Title>

      {description && (
        <Text c="dimmed" size="sm" ta="center" mb="lg">
          {description}
        </Text>
      )}

      <form onSubmit={onSubmit}>
        <Grid gap="md">
          {children}

          {errorMessage && (
            <Grid.Col span={12}>
              <Alert color="red" variant="light" radius="md" title="Feil">
                {errorMessage}
              </Alert>
            </Grid.Col>
          )}

          {submitText && (
            <Grid.Col span={12} mt="xs">
              <Button type="submit" loading={loading} disabled={disabled} fullWidth>
                {submitText}
              </Button>
            </Grid.Col>
          )}
        </Grid>
      </form>

      {footer && (
        <Text ta="center" size="sm" mt="md" c="dimmed">
          {footer}
        </Text>
      )}
    </Paper>
  );
};