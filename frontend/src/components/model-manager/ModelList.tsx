import { SimpleGrid } from "@mantine/core";

import ModelCard from "./ModelCard";
import type { Model } from "@/services/model.service";

interface Props {
  models: Model[];
  activeModel: string;
  onSelectModel: (model: string) => void;
  selectingModel?: string | null;
}

export default function ModelList({
  models,
  activeModel,
  onSelectModel,
  selectingModel,
}: Props) {
  return (
    <SimpleGrid
      cols={{
        base: 1,
        sm: 2,
        lg: 3,
      }}
      spacing="lg"
    >
      {models.map((model) => (
        <ModelCard
          key={model.name}
          {...model}
          active={model.name === activeModel}
          onSelect={onSelectModel}
          isSelecting={selectingModel === model.name}
        />
      ))}
    </SimpleGrid>
  );
}