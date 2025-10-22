import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export const RecordingTime = () => {
  return (
    <ThemedView
      style={{
        paddingHorizontal: 10,
        paddingVertical: 50,
      }}
    >
      <ThemedText
        style={{
          fontSize: 200,
          lineHeight: 200,
          textAlign: "center",
        }}
      >
        10:25
      </ThemedText>
    </ThemedView>
  );
};
