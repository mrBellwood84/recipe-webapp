"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Alert,
  Anchor,
  Center,
  Code,
  Container,
  Divider,
  List,
  Loader,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";

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
    <Container size="md" py="xl">
      <Paper radius="md" p={{ base: "lg", sm: "xl" }} withBorder shadow="xs">
          {/* Sidetittel & Metadata */}
          <div>
            <Title order={1} fw={800} c="green.9" mb={4}>
              {title}
            </Title>
            {lastUpdated && (
              <Text size="xs" c="dimmed" fw={500}>
                Sist oppdatert: {lastUpdated}
              </Text>
            )}
          </div>

          <Divider my="xs" />

          {loading ? (
            <Center py="xl">
              <Loader size="md" color="green" />
            </Center>
          ) : (
            <ReactMarkdown
              components={{
                // Overskrifter
                h2: ({ children }) => (
                  <Title order={2} mt="xl" mb="xs" size="h3" c="green.8">
                    {children}
                  </Title>
                ),
                h3: ({ children }) => (
                  <Title order={3} mt="lg" mb="xs" size="h4">
                    {children}
                  </Title>
                ),

                // Tekst og avsnitt
                p: ({ children }) => (
                  <Text size="md" lh={1.65} mb="sm" c="gray.8">
                    {children}
                  </Text>
                ),

                // Skillelinjer
                hr: () => <Divider my="xl" color="gray.2" />,

                // Lister
                ul: ({ children }) => (
                  <List mt="xs" mb="md" spacing="xs" size="md">
                    {children}
                  </List>
                ),
                ol: ({ children }) => (
                  <List type="ordered" mt="xs" mb="md" spacing="xs" size="md">
                    {children}
                  </List>
                ),
                li: ({ children }) => <List.Item>{children}</List.Item>,

                // Sitatbokser / Viktige meldinger (vises som Alert)
                blockquote: ({ children }) => (
                  <Alert
                    icon={<IconInfoCircle size={18} />}
                    color="green"
                    variant="light"
                    radius="md"
                    my="md"
                  >
                    {children}
                  </Alert>
                ),

                // Lenker
                a: ({ href, children }) => (
                  <Anchor
                    component={Link}
                    href={href || "#"}
                    c="green.7"
                    fw={600}
                    underline="hover"
                  >
                    {children}
                  </Anchor>
                ),

                // Responsiv Mantine-tabell
                table: ({ children }) => (
                  <Table.ScrollContainer minWidth={500} my="lg">
                    <Table
                      striped
                      highlightOnHover
                      withTableBorder
                      withColumnBorders
                    >
                      {children}
                    </Table>
                  </Table.ScrollContainer>
                ),
                thead: ({ children }) => <Table.Thead>{children}</Table.Thead>,
                tbody: ({ children }) => <Table.Tbody>{children}</Table.Tbody>,
                tr: ({ children }) => <Table.Tr>{children}</Table.Tr>,
                th: ({ children }) => <Table.Th bg="gray.0">{children}</Table.Th>,
                td: ({ children }) => <Table.Td>{children}</Table.Td>,
              }}
            >
              {content}
            </ReactMarkdown>
          )}
      </Paper>
    </Container>
  );
};