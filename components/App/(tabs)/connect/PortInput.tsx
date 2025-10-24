import { ThemedView } from "@/components/themed-view";
import { useStore } from "@/store/connect";
import { stores } from "@/store";
import { Text, TextInput } from "react-native";

export const PortInput = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const port = useStore((s) => s.state.port);
  const setPort = useStore((s) => s.action.setPort);

  return (
    <ThemedView style={{ gap: isPhone ? 3 : 8, marginBottom: isPhone ? 2 : 8 }}>
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
    </ThemedView>
  );
};
