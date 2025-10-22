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
      <ScrollView ref={scrollViewRef} style={{ overflow: "scroll" }}>
        <ThemedTextInput value={log} multiline editable={false} scrollEnabled />
      </ScrollView>
      <TouchableOpacity onPress={clearLog}>
        <ThemedText>Clear</ThemedText>
      </TouchableOpacity>
    </>
  );
};
