import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { modelService } from "@/services/model.service";

export function useModels() {
  return useQuery({
    queryKey: ["models"],
    queryFn: () => modelService.getModels(),
  });
}

export function useCurrentModel() {
  return useQuery({
    queryKey: ["current-model"],
    queryFn: () => modelService.getCurrentModel(),
  });
}

export function useChangeModel() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (model: string) => modelService.changeModel(model),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["current-model"],
      });
    },
  });
}