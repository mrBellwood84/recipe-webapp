"use client";

import { Group, Text, UnstyledButton } from "@mantine/core";
import Link from "next/link";

interface LogoProps {
  href?: string;
}

// Dritfet, moderne SVG som kombinerer en kokebok, bokmerke og mat-gnist
const LogoIcon = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="8" fill="var(--mantine-color-blue-filled)" />
    {/* Bok / Perm */}
    <path
      d="M8 10C8 8.89543 8.89543 8 10 8H21C22.1046 8 23 8.89543 23 10V22C23 23.1046 22.1046 24 21 24H10C8.89543 24 8 23.1046 8 22V10Z"
      fill="white"
      fillOpacity="0.2"
    />
    {/* Ark / Sider */}
    <path
      d="M10 9H20C21.1046 9 22 9.89543 22 11V21C22 22.1046 21.1046 23 20 23H10C8.89543 23 8 22.1046 8 21V11C8 9.89543 8.89543 9 10 9Z"
      fill="white"
    />
    {/* Bokmerke / Arkiv-fane */}
    <path
      d="M13 9V16L15.5 14.25L18 16V9H13Z"
      fill="var(--mantine-color-blue-filled)"
    />
    {/* Mat-gnist / Stjerne øverst */}
    <circle cx="20" cy="19" r="1.5" fill="var(--mantine-color-blue-filled)" />
  </svg>
);

export const Logo = ({ href = "/" }: LogoProps) => {
  return (
    <UnstyledButton component={Link} href={href} style={{ textDecoration: "none" }}>
      <Group gap="xs" align="center" wrap="nowrap">
        <LogoIcon size={32} />
        <Text fw={800} size="lg" style={{ letterSpacing: "-0.5px" }}>
          Kjøkkenhylla
        </Text>
      </Group>
    </UnstyledButton>
  );
};