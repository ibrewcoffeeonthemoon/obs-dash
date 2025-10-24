import { ThemedView } from "@/components/themed-view";
import { Text, TextInput, TouchableOpacity } from "react-native";
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
        <Text
          className={`text-white ${isPhone ? "text-md" : "text-xl"} font-bold`}
        >
          Password
        </Text>
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text className="text-cyan-500">
            {showPassword ? "hide" : "show"}
          </Text>
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
