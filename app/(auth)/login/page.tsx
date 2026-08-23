"use client"

import {Box, Button, Container, Stack} from "@mantine/core";
import {agentInternal} from "@/lib/agent/agentInternal";
import {LoginRequestDTO} from "@/lib/models/auth/loginRequestDTO";

const credentials: LoginRequestDTO[] = [
  { email: "admin@recipeapp.com", password: "AdminSuperSecretPassword123!" },
  { email: "user1@example.com", password: "DevUser123!" },
  { email: "user2@example.com", password: "DevUser123!" },
]

const LoginPage = () => {

  const onStaticLoginClick = (user: LoginRequestDTO) => {
    agentInternal.post("/api/auth/login", user)
      .then(x => x.json()
        .then(data => console.log(data)));
  }
  return (
    <Container>
      <Box>
        <div>Loginform not added!</div>
      </Box>
      <Stack gap="xs">
        <Button onClick={() => {onStaticLoginClick(credentials[0])}}>Login Admin</Button>
        <Button>Login User 1</Button>
        <Button>Login User 2</Button>
      </Stack>
    </Container>
  )
}

export default LoginPage