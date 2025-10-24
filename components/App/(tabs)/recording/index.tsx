import { ThemedView } from "@/components/themed-view";
import { Banner } from "./Banner";
import { RecordingTime } from "./RecordingTime";
import { RecordButton } from "./RecordButton";
import { stores } from "@/store";
import { KeepAwakeButton } from "./KeepAwakeButton";
import { ProfileName } from "./ProfileName";
import { Text } from "react-native";

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
            <ProfileName />
            <RecordingTime />
            <RecordButton />
            <KeepAwakeButton />
          </>
        ) : (
          <Text className="text-red-400 text-4xl font-bold">
            Please connect to OBS first.
          </Text>
        )}
      </ThemedView>
    </>
  );
}
