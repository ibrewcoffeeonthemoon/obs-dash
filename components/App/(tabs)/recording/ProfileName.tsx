import { stores } from "@/store";
import { useStore } from "@/store/recording";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { obs } from "@/lib/obs";

const styles = StyleSheet.create({
  item: {
    color: "white",
    backgroundColor: "black",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
});

export const ProfileName = () => {
  const isPhone = stores.app.useStore((s) => s.stash.isPhone);
  const profileName = useStore((s) => s.stash.profileName);
  const profiles = useStore((s) => s.stash.profiles);

  const setOBSProfile = async (profileName: string) => {
    await obs.call("SetCurrentProfile", { profileName });
  };

  return (
    <View className="flex flex-col justify-between items-center border-2 border-gray-800">
      <Picker
        mode="dropdown"
        style={{
          width: "100%",
        }}
        dropdownIconColor="white"
        selectedValue={profileName}
        onValueChange={(profileName) => setOBSProfile(profileName)}
      >
        {profiles.map((name, i) => (
          <Picker.Item
            key={i}
            style={{ ...styles.item, fontSize: isPhone ? 18 : 26 }}
            label={name}
            value={name}
          />
        ))}
      </Picker>
    </View>
  );
};
