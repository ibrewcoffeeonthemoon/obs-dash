import { ThemedView } from "@/components/themed-view";
import { styles } from "./styles";
import { ThemedText } from "@/components/themed-text";
import { TouchableOpacity } from "react-native";
import { ThemedTextInput } from "@/components/themed-textinput";
import { useStore } from "@/store/connect";
import { stores } from "@/store";

export const PasswordInput = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);

  const password = useStore((s) => s.state.password);
  const setPassword = useStore((s) => s.action.setPassword);

  const showPassword = useStore((s) => s.stash.showPassword);
  const setShowPassword = useStore((s) => s.action.setShowPassword);

  return (
    <ThemedView style={styles.stepContainer}>
      <ThemedView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ThemedText type={isPhone ? "default" : "subtitle"}>
          Password
        </ThemedText>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <ThemedText>{showPassword ? "hide" : "show"}</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedTextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry={!showPassword}
        selectTextOnFocus
      />
    </ThemedView>
  );
};
