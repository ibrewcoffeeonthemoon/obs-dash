import { Image } from "expo-image";
import { View } from "react-native";

export const Banner = () => {
  return (
    <View className="flex-row gap-2 h-[65px]">
      <Image
        source={require("@/assets/images/partial-react-logo.png")}
        style={{
          height: 200,
          width: 290,
          bottom: 0,
          left: 0,
          position: "absolute",
        }}
      />
    </View>
  );
};
