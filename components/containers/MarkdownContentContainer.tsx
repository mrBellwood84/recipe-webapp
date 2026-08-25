"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Center, Container, Divider, Loader, Paper, Stack, Text, Title, Typography } from "@mantine/core";

interface MarkdownContentContainerProps {
  title: string;
  filePath: string;
}

export const MarkdownContentContainer = ({ title, filePath }: MarkdownContentContainerProps) => {
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
        const dateMatch = text.match(/^\*\*Sist oppdatert:\*\*\s*(.+)$/m);
        if (dateMatch) {
          setLastUpdated(dateMatch[1].trim());
        }

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
          <Divider />
          {loading ? (
            <Center py="xl">
              <Loader size="sm" />
            </Center>
          ) : (
            /*
            */
            <Typography>
              <ReactMarkdown>{content}</ReactMarkdown>
            </Typography>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};
