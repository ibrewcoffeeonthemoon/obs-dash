import { stores } from "@/store";
import { useStore } from "@/store/recording";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const styles = StyleSheet.create({
  item: {
    color: "white",
    backgroundColor: "black",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
});

export const ProfileName = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const profileName = useStore((s) => s.stash.profileName);
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <View className="flex flex-col justify-between items-center border-2 border-gray-800">
      <Picker
        mode="dropdown"
        style={{
          width: "100%",
        }}
        dropdownIconColor="white"
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item style={styles.item} label="Java" value="java" />
        <Picker.Item style={styles.item} label="JavaScript" value="js" />
        <Picker.Item style={styles.item} label="Python" value="python" />
        <Picker.Item style={styles.item} label="C++" value="cpp" />
      </Picker>
    </View>
  );
};
