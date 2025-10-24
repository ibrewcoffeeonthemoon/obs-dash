import { styles } from "./styles";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { View } from "react-native";

export const Banner = () => {
  return (
    <View className="flex-row gap-2 h-[65px]">
      <IconSymbol
        size={310}
        color="#808080"
        name="chevron.left.forwardslash.chevron.right"
        style={styles.headerImage}
      />
    </View>
  );
};
