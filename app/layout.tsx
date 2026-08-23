// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';

import {
  AppShell,
  AppShellHeader,
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider
} from '@mantine/core';
import {ReactNode} from "react";
import MainShell from "@/components/layout/MainShell";

interface IProps {
  children: ReactNode;
}

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

const theme = createTheme({});

export default function RootLayout({children}: IProps) {
  return (
    <html lang="en" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript/>
    </head>

    <body>
      <MantineProvider theme={theme}>
        <MainShell>
          {children}
        </MainShell>
      </MantineProvider>
    </body>

    </html>
  );
}