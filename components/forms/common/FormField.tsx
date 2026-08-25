"use client";

import React from "react";
import { Grid, GridColProps, PasswordInput, TextInput, Textarea } from "@mantine/core";
import { useAppFormContext } from "./FormContext";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "textarea";
  required?: boolean;
  disabled?: boolean;
  span?: GridColProps["span"];
  minRows?: number;
  extra?: React.ReactNode;
}

export const FormField = ({
                            name,
                            label,
                            placeholder,
                            type = "text",
                            required = false,
                            disabled = false,
                            span = 12,
                            minRows = 3,
                            extra,
                          }: FormFieldProps) => {
  const form = useAppFormContext();

  let InputComponent: React.ElementType = TextInput;
  if (type === "password") InputComponent = PasswordInput;
  if (type === "textarea") InputComponent = Textarea;

  return (
    <Grid.Col span={span}>
      <InputComponent
        label={label}
        placeholder={placeholder}
        withAsterisk={required}
        disabled={disabled}
        {...(type === "textarea" ? { minRows } : {})}
        key={form.key(name)}
        {...form.getInputProps(name)}
      />
      {extra}
    </Grid.Col>
  );
};