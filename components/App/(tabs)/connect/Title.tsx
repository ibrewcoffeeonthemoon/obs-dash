import { stores } from "@/store";
import { Text, View } from "react-native";

export const Title = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);

  return (
    <View className="flex flex-row items-center g-2">
      <Text
        className={`text-white ${isPhone ? "text-2xl" : "text-4xl"} font-bold`}
      >
        Connect To OBS Websocket
      </Text>
    </View>
  );
};
