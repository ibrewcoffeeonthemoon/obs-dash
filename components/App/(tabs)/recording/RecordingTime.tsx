import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export const RecordingTime = () => {
  return (
    <ThemedView
      style={{
        paddingHorizontal: 20,
        paddingVertical: 50,
      }}
    >
      <ThemedText
        style={{
          fontSize: 120,
          lineHeight: 120,
          textAlign: "center",
        }}
      >
        00:10:25
      </ThemedText>
      ;
    </ThemedView>
  );
};
