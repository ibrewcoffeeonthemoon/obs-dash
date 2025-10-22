import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Banner } from "./Banner";
import { Title } from "./Title";
import { RecordingTime } from "./RecordingTime";

export default function Recording() {
  return (
    <>
      <Banner />
      <ThemedView
        style={{
          flex: 1,
          padding: 32,
          gap: 16,
        }}
      >
        <Title />
        <RecordingTime />
        <ThemedText type="subtitle">Start/Pause/Stop button</ThemedText>
      </ThemedView>
    </>
  );
}
