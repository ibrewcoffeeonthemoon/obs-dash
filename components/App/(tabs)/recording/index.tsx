import { Banner } from "./Banner";
import { RecordingTime } from "./RecordingTime";
import { RecordButton } from "./RecordButton";
import { stores } from "@/store";
import { KeepAwakeButton } from "./KeepAwakeButton";
import { ProfileName } from "./ProfileName";
import { Text, View } from "react-native";
import { SceneName } from "./SceneName";

export default function Recording() {
  const isConnected = stores.connect.useStore((s) => s.stash.isConnected);

  return (
    <>
      <Banner />
      <View className="flex-1 p-8 gap-4">
        {isConnected ? (
          <>
            <SceneName />
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
      </View>
    </>
  );
}
