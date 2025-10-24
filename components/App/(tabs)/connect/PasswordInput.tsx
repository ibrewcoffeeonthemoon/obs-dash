import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { TextInput, TouchableOpacity } from "react-native";
import { useStore } from "@/store/connect";
import { stores } from "@/store";

export const PasswordInput = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);

  const password = useStore((s) => s.state.password);
  const setPassword = useStore((s) => s.action.setPassword);

  const showPassword = useStore((s) => s.stash.showPassword);
  const setShowPassword = useStore((s) => s.action.setShowPassword);

  return (
    <ThemedView style={{ gap: isPhone ? 3 : 8, marginBottom: isPhone ? 2 : 8 }}>
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
          <ThemedText style={{ color: "#6699aa" }}>
            {showPassword ? "hide" : "show"}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <TextInput
        className="text-white border border-[#ccc] p-2 rounded"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry={!showPassword}
        selectTextOnFocus
      />
    </ThemedView>
  );
};
