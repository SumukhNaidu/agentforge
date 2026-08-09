import ModelCard from "@/components/model-manager/ModelCard";

export default function Test() {
  return (
    <div
      style={{
        maxWidth: 420,
        margin: "30px",
      }}
    >
      <ModelCard
        name="qwen2.5:1.5b"
        size="940 MB"
        family="qwen2"
        parameters="1.5B"
        quantization="Q4_K_M"
        modified_at=""
        active
      />
    </div>
  );
}