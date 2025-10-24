import { Image } from "expo-image";
import { stores } from "@/store";
import { View } from "react-native";

export const Banner = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);

  return (
    <View
      className={`flex flex-row items-center gap-2 ${isPhone ? "h-20" : "h-42"}`}
    >
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
