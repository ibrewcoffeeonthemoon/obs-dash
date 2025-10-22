import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";

export const Title = () => {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Connect To OBS Websocket</ThemedText>
    </ThemedView>
  );
};
