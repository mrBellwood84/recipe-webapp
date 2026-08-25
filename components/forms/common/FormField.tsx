"use client";

import React from "react";
import { Grid, GridColProps, PasswordInput, TextInput } from "@mantine/core";
import { useAppFormContext } from "./FormContext";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email";
  required?: boolean;
  disabled?: boolean;
  span?: GridColProps["span"];
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
                            extra,
                          }: FormFieldProps) => {
  const form = useAppFormContext();
  const InputComponent = type === "password" ? PasswordInput : TextInput;

  return (
    <Grid.Col span={span}>
      <InputComponent
        label={label}
        placeholder={placeholder}
        withAsterisk={required}
        disabled={disabled}
        key={form.key(name)}
        {...form.getInputProps(name)}
      />
      {extra}
    </Grid.Col>
  );
};