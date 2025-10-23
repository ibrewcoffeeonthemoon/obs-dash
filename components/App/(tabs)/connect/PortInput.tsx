import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-textinput";
import { useStore } from "@/store/connect";
import { stores } from "@/store";

export const PortInput = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const port = useStore((s) => s.state.port);
  const setPort = useStore((s) => s.action.setPort);

  return (
    <ThemedView style={{ gap: isPhone ? 3 : 8, marginBottom: isPhone ? 2 : 8 }}>
      <ThemedText type={isPhone ? "default" : "subtitle"}>Port</ThemedText>
      <ThemedTextInput
        style={styles.input}
        value={port}
        onChangeText={setPort}
        placeholder="Enter Port"
        keyboardType="numeric"
        selectTextOnFocus
      />
    </ThemedView>
  );
};
