import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { Fonts } from "@/constants/theme";

export const Title = () => {
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedText
        type="title"
        style={{
          fontFamily: Fonts.rounded,
        }}
      >
        Recording Control
      </ThemedText>
    </ThemedView>
  );
};
