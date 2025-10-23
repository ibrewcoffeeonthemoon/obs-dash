import { Image } from "expo-image";
import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { stores } from "@/store";

export const Banner = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);

  return (
    <ThemedView
      style={{ ...styles.titleContainer, height: isPhone ? 70 : 150 }}
    >
      <Image
        source={require("@/assets/images/partial-react-logo.png")}
        style={styles.reactLogo}
      />
    </ThemedView>
  );
};
