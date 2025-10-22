import { ThemedView } from "@/components/themed-view";
import { Banner } from "./Banner";
import { RecordingTime } from "./RecordingTime";
import { RecordButton } from "./RecordButton";
import { stores } from "@/store";

export default function Recording() {
  const isConnected = stores.connect.useStore((s) => s.stash.isConnected);

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
        {isConnected && (
          <>
            <RecordingTime />
            <RecordButton />
          </>
        )}
      </ThemedView>
    </>
  );
}
