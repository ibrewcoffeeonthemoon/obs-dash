import { stores } from "@/store";
import { useStore } from "@/store/connect";
import { useEffect, useRef } from "react";
import { Text, ScrollView, TextInput, TouchableOpacity } from "react-native";

export const LogArea = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const scrollViewRef = useRef<ScrollView>(null);
  const log = useStore((s) => s.stash.log);
  const clearLog = useStore((s) => s.action.clearLog);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [log]);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={{ borderColor: "gray", borderWidth: 1 }}
      >
        <ScrollView horizontal={true}>
          <TextInput
            value={log}
            multiline
            editable={false}
            className={`text-white font-mono ${isPhone ? "text-sm" : "text-md"}`}
          />
        </ScrollView>
      </ScrollView>
      <TouchableOpacity onPress={clearLog}>
        <Text className="text-right text-pink-700 pr-2">Clear</Text>
      </TouchableOpacity>
    </>
  );
};
