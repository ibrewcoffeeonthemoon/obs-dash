import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import { styles } from "./styles";
import { Banner } from "./Banner";

export default function Recording() {
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
      </ThemedView>
    </>
  );
}
