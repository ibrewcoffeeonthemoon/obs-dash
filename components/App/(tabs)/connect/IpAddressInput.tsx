import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { useStore } from "@/store/connect";
import { stores } from "@/store";
import { TextInput } from "react-native";

export const IpAddressInput = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const ipAddress = useStore((s) => s.state.ipAddress);
  const setIpAddress = useStore((s) => s.action.setIpAddress);

  return (
    <ThemedView style={{ gap: isPhone ? 3 : 8, marginBottom: isPhone ? 2 : 8 }}>
      <ThemedText type={isPhone ? "default" : "subtitle"}>
        IP Address
      </ThemedText>
      <TextInput
        className="text-white border border-[#ccc] p-2 rounded"
        value={ipAddress}
        onChangeText={setIpAddress}
        placeholder="Enter IP Address"
        selectTextOnFocus
      />
    </ThemedView>
  );
};
