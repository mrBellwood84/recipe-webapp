// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/notifications/styles.css';


import {ColorSchemeScript, createTheme, mantineHtmlProps, MantineProvider} from '@mantine/core';
import {Notifications} from '@mantine/notifications'
import {ReactNode} from "react";
import MainShell from "@/components/layout/MainShell";
import {SessionProvider} from "@/lib/session/SessionProvider";
import sessionManager from "@/lib/session/sessionManager";

interface IProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Min oppskrifts applikasjon',
  description: 'I have followed setup instructions carefully',
};

const theme = createTheme({});

export default async function RootLayout({children}: IProps) {

  const user = await sessionManager.getUserData();
  return (
    <html lang="nb" {...mantineHtmlProps}>
    <head>
      <ColorSchemeScript/>
    </head>

    <body>
    <SessionProvider initialUser={user}>
      <MantineProvider theme={theme}>
        <Notifications/>
        <MainShell>
          {children}
        </MainShell>
      </MantineProvider>
    </SessionProvider>
    </body>

    </html>
  );
}