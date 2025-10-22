import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { styles } from "./styles";

export default function Recording() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
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
      <ThemedText>Quick Toggle to start/pause/stop OBS recording</ThemedText>
      <ThemedText type="subtitle">Show recording time</ThemedText>
      <ThemedText type="subtitle">Start/Pause/Stop button</ThemedText>
    </ParallaxScrollView>
  );
}
