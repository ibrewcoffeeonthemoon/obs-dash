import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { stores } from "@/store";
import { Text } from "react-native";

export const Title = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);

  return (
    <ThemedView style={styles.titleContainer}>
      <Text
        className={`text-white ${isPhone ? "text-2xl" : "text-4xl"} font-bold`}
      >
        Connect To OBS Websocket
      </Text>
    </ThemedView>
  );
};
