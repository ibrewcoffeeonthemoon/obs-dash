import { useStore } from "@/store/connect";
import { stores } from "@/store";
import { Text, TextInput, View } from "react-native";

export const IpAddressInput = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const ipAddress = useStore((s) => s.state.ipAddress);
  const setIpAddress = useStore((s) => s.action.setIpAddress);

  return (
    <View className={`flex ${isPhone ? "gap-[3px] mb-[2px]" : "gap-2 mb-2"}`}>
      <Text
        className={`text-white ${isPhone ? "text-md" : "text-xl"} font-bold`}
      >
        IP Address
      </Text>
      <TextInput
        className="text-white border border-[#ccc] p-2 rounded"
        value={ipAddress}
        onChangeText={setIpAddress}
        placeholder="Enter IP Address"
        selectTextOnFocus
      />
    </View>
  );
};
