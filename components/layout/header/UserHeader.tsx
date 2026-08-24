import {useSession} from "@/lib/session/SessionProvider";
import {agentInternal} from "@/lib/agent/agentInternal";
import { useRouter} from "next/navigation";
import {Anchor, Button, Container, Group} from "@mantine/core";
import Link from "next/link";

export const UserHeader = () => {
  const session = useSession()
  const router = useRouter();

  const clickLogout = () => {
    agentInternal.get("/api/auth/logout").then((x) => {
      if (x.status === 200) {
        session.setUser(undefined);
        session.setRole(undefined);
        router.push("/");
      }
    })
  }

  return (
    <Container size="lg" h="100%">
      <Group justify="space-between" align="center" h="100%">

        <Group gap="xs">
          <Button component={Link} href="/">LOGO</Button>
          <span>Oppskrifter</span>
        </Group>

        <Group gap="lg" visibleFrom="sm">
          <Anchor href="/dashboard">Oversikt</Anchor>
        </Group>

        <Group gap="xs">
          <span>Hei {session.user?.firstName}</span>
          <Button size="xs" onClick={clickLogout}>Logout</Button>
        </Group>

      </Group>
    </Container>
  );
}