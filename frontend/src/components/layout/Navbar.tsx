import { Group, Title } from "@mantine/core";

export default function Navbar() {
  return (
    <Group h="100%" px="md" justify="space-between">
      <Title order={3}>AgentForge</Title>
    </Group>
  );
}