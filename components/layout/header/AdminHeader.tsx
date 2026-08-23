import {useSession} from "@/lib/session/SessionProvider";
import {agentInternal} from "@/lib/agent/agentInternal";
import {redirect} from "next/navigation";
import {Button, Container, Group} from "@mantine/core";
import Link from "next/link";

export const AdminHeader = () => {
  const session = useSession()

  const clickLogout = () => {
    agentInternal.get("/api/auth/logout").then((x) => {
      console.log(x);
      if (x.status === 200) {
        session.setUser(undefined);
        session.setRole(undefined);
        redirect("/");
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
          <span>link</span>
          <span>link</span>
          <span>link</span>
        </Group>

        <Group gap="xs">
          <Button size="xs" onClick={clickLogout}>Logout</Button>
        </Group>

      </Group>
    </Container>
  );
}