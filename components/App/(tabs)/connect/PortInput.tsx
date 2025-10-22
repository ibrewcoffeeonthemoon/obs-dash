import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-textinput";
import { useStore } from "@/store/connect";

export const PortInput = () => {
  const port = useStore((s) => s.state.port);
  const setPort = useStore((s) => s.action.setPort);

  return (
    <ThemedView style={styles.stepContainer}>
      <ThemedText type="subtitle">Port</ThemedText>
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
