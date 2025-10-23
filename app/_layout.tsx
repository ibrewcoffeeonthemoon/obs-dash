import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useEffect } from "react";
import { deactivateKeepAwake } from "expo-keep-awake";
import { useStore } from "@/store/app";
import { Dimensions } from "react-native";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const setIsPhone = useStore((s) => s.action.setIsPhone);

  useEffect(() => {
    // decide is phone or not by screen width
    const { width } = Dimensions.get("window");
    setIsPhone(width < 600);

    // disable keep awake on app launch
    deactivateKeepAwake();
  }, [setIsPhone]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
