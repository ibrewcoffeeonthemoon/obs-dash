import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { stores } from "@/store";

export const Title = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type={isPhone ? "subtitle" : "title"}>
        Connect To OBS Websocket
      </ThemedText>
    </ThemedView>
  );
};
