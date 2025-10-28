import { stores } from "@/store";
import { useStore } from "@/store/recording";
import { Text, View } from "react-native";

export const ProfileName = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const profileName = useStore((s) => s.stash.profileName);

  return (
    <View className="flex flex-col justify-between items-center">
      <Text
        className={`text-white text-center ${isPhone ? "text-2xl" : "text-4xl"} font-bold`}
      >
        {profileName}
      </Text>
    </View>
  );
};
