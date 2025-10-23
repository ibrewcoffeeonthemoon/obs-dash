import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-textinput";
import { useStore } from "@/store/connect";
import { stores } from "@/store";

export const IpAddressInput = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const ipAddress = useStore((s) => s.state.ipAddress);
  const setIpAddress = useStore((s) => s.action.setIpAddress);

  return (
    <ThemedView style={styles.stepContainer}>
      <ThemedText type={isPhone ? "default" : "subtitle"}>
        IP Address
      </ThemedText>
      <ThemedTextInput
        style={styles.input}
        value={ipAddress}
        onChangeText={setIpAddress}
        placeholder="Enter IP Address"
        selectTextOnFocus
      />
    </ThemedView>
  );
};
