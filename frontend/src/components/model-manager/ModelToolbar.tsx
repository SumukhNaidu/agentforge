import { Button, Group, TextInput } from "@mantine/core";
import { IconRefresh, IconSearch } from "@tabler/icons-react";

interface Props {
  onRefresh: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function ModelToolbar({
  onRefresh,
  search,
  onSearchChange,
}: Props) {
  return (
    <Group justify="space-between" mb="lg">
      <TextInput
        placeholder="Search models..."
        leftSection={<IconSearch size={16} />}
        value={search}
        onChange={(e) => onSearchChange(e.currentTarget.value)}
        w={300}
      />

      <Button
        leftSection={<IconRefresh size={16} />}
        onClick={onRefresh}
      >
        Refresh
      </Button>
    </Group>
  );
}