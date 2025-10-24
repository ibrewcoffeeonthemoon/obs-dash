import { useStore } from "@/store/connect";
import { stores } from "@/store";
import { Text, TextInput, View } from "react-native";

export const PortInput = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const port = useStore((s) => s.state.port);
  const setPort = useStore((s) => s.action.setPort);

  return (
    <View className={`flex ${isPhone ? "gap-[3px] mb-[2px]" : "gap-2 mb-2"}`}>
      <Text
        className={`text-white ${isPhone ? "text-md" : "text-xl"} font-bold`}
      >
        Port
      </Text>
      <TextInput
        className="text-white border border-[#ccc] p-2 rounded"
        value={port}
        onChangeText={setPort}
        placeholder="Enter Port"
        keyboardType="numeric"
        selectTextOnFocus
      />
    </View>
  );
};
