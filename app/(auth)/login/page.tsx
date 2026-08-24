"use client"

import {Box, Button, Container, Stack} from "@mantine/core";
import {agentInternal} from "@/lib/agent/agentInternal";
import {LoginRequestDTO} from "@/lib/models/auth/loginRequestDTO";
import {User} from "@/lib/models/user/user";
import {HttpResponse} from "@/lib/models/httpResponse";
import {useSession} from "@/lib/session/SessionProvider";
import {useRouter} from "next/navigation";

const credentials: LoginRequestDTO[] = [
  { email: "admin@recipeapp.com", password: "AdminSuperSecretPassword123!" },
  { email: "user1@example.com", password: "DevUser123!" },
  { email: "user2@example.com", password: "DevUser123!" },
]

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();

  const onStaticLoginClick = (user: LoginRequestDTO) => {
    agentInternal.post("/api/auth/login", user)
      .then(x => x.json() as unknown as HttpResponse<User | undefined>)
      .then(data => {
        switch (data.statusCode){
          case 200:
            session.setUser(data.body);
            session.setRole(data.body?.role)
            if (data.body?.role === "Admin") router.push("/admin/dashboard");
            else router.push("/dashboard");

        }
      })
      .catch((err) => console.error(err));
  }
  return (
    <Container>
      <Box>
        <div>Loginform not added!</div>
      </Box>
      <Stack gap="xs">
        <Button onClick={() => {onStaticLoginClick(credentials[0])}}>Login Admin</Button>
        <Button onClick={() => onStaticLoginClick(credentials[1])}>Login User 1</Button>
        <Button onClick={() => onStaticLoginClick(credentials[2])}>Login User 2</Button>
      </Stack>
    </Container>
  )
}

export default LoginPage