"use client";

import {useEffect, useState} from "react";
import ReactMarkdown from "react-markdown";
import {Center, Container, Divider, List, Loader, Paper, Stack, Text, Title,} from "@mantine/core";

interface MarkdownContentContainerProps {
  title: string;
  filePath: string;
}

export const MarkdownContentContainer = ({
                                           title,
                                           filePath,
                                         }: MarkdownContentContainerProps) => {
  const [content, setContent] = useState<string>("");
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error(`Fant ikke filen (${res.status})`);
        return res.text();
      })
      .then((text) => {
        // Ekstraherer "Sist oppdatert" dynamisk fra linjen i markdown-filen
        const dateMatch = text.match(/^\*\*Sist oppdatert:\*\*\s*(.+)$/m);
        if (dateMatch) {
          setLastUpdated(dateMatch[1].trim());
        }

        // Fjerner tittel og datolinje fra selve brødteksten
        const markdownContent = text
          .replace(/^#\s+.*$/m, "")
          .replace(/^\*\*Sist oppdatert:\*\*.*$/m, "")
          .trim();
        setContent(markdownContent);
      })
      .catch((err) => {
        console.error("Feil ved lasting av markdown:", err);
        setContent("Kunne ikke laste innholdet. Vennligst prøv igjen senere.");
      })
      .finally(() => setLoading(false));
  }, [filePath]);

  return (
    <Container size="md" py="lg">
      <Paper radius="md" p="xl" withBorder>
        <Stack gap="md">
          <div>
            <Title order={1} mb={4}>
              {title}
            </Title>
            {lastUpdated && (
              <Text size="sm" c="dimmed">
                Sist oppdatert: {lastUpdated}
              </Text>
            )}
          </div>
          <Divider/>
          {loading ? (
            <Center py="xl">
              <Loader size="sm"/>
            </Center>
          ) : (
            <ReactMarkdown
              components={{
                h1: ({children}) => <Title order={2} mt="md" mb={4}>{children}</Title>,
                h2: ({children}) => <Title order={3} mt="sm" mb={4}>{children}</Title>,
                h3: ({children}) => <Title order={4} mt="xs" mb={4}>{children}</Title>,
                p: ({children}) => <Text size="sm" mb={6} lh="1.5">{children}</Text>,
                ul: ({children}) => <List size="sm" mb={6} withPadding>{children}</List>,
                li: ({children}) => <List.Item>{children}</List.Item>,
                hr: () => <Divider my="sm"/>,
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};