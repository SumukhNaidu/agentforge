import { Stack, Button } from "@mantine/core";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <Stack p="md">
      <Button component={Link} to="/dashboard" variant="subtle">
        Dashboard
      </Button>

      <Button component={Link} to="/models" variant="subtle">
        Models
      </Button>

      <Button component={Link} to="/chat" variant="subtle">
        Chat
      </Button>

      <Button component={Link} to="/prompt-lab" variant="subtle">
        Prompt Lab
      </Button>

      <Button component={Link} to="/rag" variant="subtle">
        RAG Studio
      </Button>

      <Button component={Link} to="/agents" variant="subtle">
        Agents
      </Button>

      <Button component={Link} to="/evaluation" variant="subtle">
        Evaluation
      </Button>

      <Button component={Link} to="/settings" variant="subtle">
        Settings
      </Button>
    </Stack>
  );
}