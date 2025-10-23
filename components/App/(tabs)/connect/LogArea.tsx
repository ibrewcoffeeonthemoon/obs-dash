import { ThemedText } from "@/components/themed-text";
import { ThemedTextInput } from "@/components/themed-textinput";
import { useStore } from "@/store/connect";
import { useEffect, useRef } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

export const LogArea = () => {
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
          <ThemedTextInput
            value={log}
            multiline
            editable={false}
            style={{
              fontFamily: "monospace",
            }}
          />
        </ScrollView>
      </ScrollView>
      <TouchableOpacity onPress={clearLog}>
        <ThemedText style={{ textAlign: "right", color: "#ff7777" }}>
          Clear
        </ThemedText>
      </TouchableOpacity>
    </>
  );
};
