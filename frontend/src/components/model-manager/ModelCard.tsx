import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { IconCheck } from "@tabler/icons-react";

export interface ModelCardProps {
  name: string;
  size: string;
  family: string;
  parameters: string;
  quantization: string;
  modified_at: string;
  active?: boolean;
  onSelect?: (model: string) => void;
  isSelecting?: boolean;
}

export default function ModelCard({
  name,
  size,
  family,
  parameters,
  quantization,
  active = false,
  onSelect,
  isSelecting = false,
}: ModelCardProps) {
  return (
    <Card shadow="sm" radius="md" withBorder p="lg">
      <Group justify="space-between" mb="sm">
        <Title order={4}>{name}</Title>

        {active && (
          <Badge
            color="green"
            leftSection={<IconCheck size={12} />}
          >
            Active
          </Badge>
        )}
      </Group>

      <Divider mb="md" />

      <Stack gap="xs">
        <Group justify="space-between">
          <Text c="dimmed">Size</Text>
          <Text fw={500}>{size}</Text>
        </Group>

        <Group justify="space-between">
          <Text c="dimmed">Family</Text>
          <Text fw={500}>{family}</Text>
        </Group>

        <Group justify="space-between">
          <Text c="dimmed">Parameters</Text>
          <Text fw={500}>{parameters}</Text>
        </Group>

        <Group justify="space-between">
          <Text c="dimmed">Quantization</Text>
          <Text fw={500}>{quantization}</Text>
        </Group>
      </Stack>

      <Button
        fullWidth
        mt="lg"
        variant={active ? "filled" : "light"}
        disabled={active || isSelecting}
        loading={isSelecting}
        onClick={() => onSelect?.(name)}
      >
        {active ? "Current Model" : "Select"}
      </Button>
    </Card>
  );
}