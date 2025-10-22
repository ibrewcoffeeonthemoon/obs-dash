import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Banner } from "./Banner";
import { Title } from "./Title";

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
        <ThemedText>Quick Toggle to start/pause/stop OBS recording</ThemedText>
        <ThemedText type="subtitle">Show recording time</ThemedText>
        <ThemedText type="subtitle">Start/Pause/Stop button</ThemedText>
      </ThemedView>
    </>
  );
}
