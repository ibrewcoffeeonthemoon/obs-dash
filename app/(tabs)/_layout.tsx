import { Tabs } from "expo-router";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Connect",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="wifi" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="recording"
        options={{
          title: "Recording",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="fiber-manual-record" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
