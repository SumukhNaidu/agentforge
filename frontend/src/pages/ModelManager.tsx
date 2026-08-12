import { Stack } from "@mantine/core";
import { useMemo, useState } from "react";

import {
  useChangeModel,
  useModels,
  useCurrentModel,
} from "@/hooks/useModels";

import ModelToolbar from "@/components/model-manager/ModelToolbar";
import CurrentModelCard from "@/components/model-manager/CurrentModelCard";
import ModelList from "@/components/model-manager/ModelList";

export default function ModelManager() {
  const [search, setSearch] = useState("");

  const {
    data: models = [],
    refetch,
    isLoading,
  } = useModels();

  const {
    data: current,
  } = useCurrentModel();

  const changeModel = useChangeModel();

  const filteredModels = useMemo(() => {
    return models.filter((model) =>
      model.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [models, search]);

  const handleSelectModel = (model: string) => {
    changeModel.mutate(model);
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Stack>
      <ModelToolbar
        onRefresh={refetch}
        search={search}
        onSearchChange={setSearch}
      />

      <CurrentModelCard
        activeModel={current?.active_model ?? ""}
      />

      <ModelList
        models={filteredModels}
        activeModel={current?.active_model ?? ""}
        onSelectModel={handleSelectModel}
        selectingModel={
          changeModel.isPending
            ? changeModel.variables
            : null
        }
      />
    </Stack>
  );
}