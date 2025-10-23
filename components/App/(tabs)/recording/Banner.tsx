import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { IconSymbol } from "@/components/ui/icon-symbol";

export const Banner = () => {
  return (
    <ThemedView style={{ ...styles.titleContainer, height: 125 }}>
      <IconSymbol
        size={310}
        color="#808080"
        name="chevron.left.forwardslash.chevron.right"
        style={styles.headerImage}
      />
    </ThemedView>
  );
};
