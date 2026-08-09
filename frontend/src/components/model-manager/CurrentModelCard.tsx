import {
  Badge,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";

interface Props {
  activeModel: string;
}

export default function CurrentModelCard({
  activeModel,
}: Props) {
  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
    >
      <Stack>

        <Title order={4}>
          Current Model
        </Title>

        <Badge
          size="xl"
          color="green"
        >
          {activeModel}
        </Badge>

      </Stack>
    </Card>
  );
}