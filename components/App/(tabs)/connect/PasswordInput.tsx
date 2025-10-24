import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useStore } from "@/store/connect";
import { stores } from "@/store";

export const PasswordInput = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);

  const password = useStore((s) => s.state.password);
  const setPassword = useStore((s) => s.action.setPassword);

  const showPassword = useStore((s) => s.stash.showPassword);
  const setShowPassword = useStore((s) => s.action.setShowPassword);

  return (
    <View className={`flex ${isPhone ? "gap-[3px] mb-[2px]" : "gap-2 mb-2"}`}>
      <View className="flex flex-row justify-between items-center">
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
      </View>
      <TextInput
        className="text-white border border-[#ccc] p-2 rounded"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        secureTextEntry={!showPassword}
        selectTextOnFocus
      />
    </View>
  );
};
