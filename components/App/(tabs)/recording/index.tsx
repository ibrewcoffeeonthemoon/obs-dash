import { ThemedView } from "@/components/themed-view";
import { Banner } from "./Banner";
import { RecordingTime } from "./RecordingTime";
import { RecordButton } from "./RecordButton";

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
        <RecordingTime />
        <RecordButton />
      </ThemedView>
    </>
  );
}
