import { ThemedView } from "@/components/themed-view";
import { Banner } from "./Banner";
import { RecordingTime } from "./RecordingTime";
import { RecordButton } from "./RecordButton";
import { stores } from "@/store";
import { ThemedText } from "@/components/themed-text";
import { KeepAwakeButton } from "./KeepAwakeButton";

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
        {isConnected ? (
          <>
            <RecordingTime />
            <RecordButton />
            <KeepAwakeButton />
          </>
        ) : (
          <ThemedText type="title">Please connect to OBS first.</ThemedText>
        )}
      </ThemedView>
    </>
  );
}
