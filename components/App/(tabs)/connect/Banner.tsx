import { Image } from "expo-image";
import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";

export const Banner = () => {
  return (
    <ThemedView style={{ ...styles.titleContainer, height: 150 }}>
      <Image
        source={require("@/assets/images/partial-react-logo.png")}
        style={styles.reactLogo}
      />
    </ThemedView>
  );
};
