import { IconSymbol } from "@/components/ui/icon-symbol";
import { View } from "react-native";

export const Banner = () => {
  return (
    <View className="flex-row gap-2 h-[65px]">
      <IconSymbol
        size={310}
        color="#808080"
        name="chevron.left.forwardslash.chevron.right"
        style={{
          color: "#808080",
          bottom: -90,
          left: -35,
          position: "absolute",
        }}
      />
    </View>
  );
};
